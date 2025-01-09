import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { UserService } from '../users/user.service';
import config from '~/libs/config/config';
import { DatingIdea } from './idea.model';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const today = new Date().toISOString().split('T')[0];
const oneMonthLater = new Date();
oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
const dateInAMonth = oneMonthLater.toISOString().split('T')[0];

const schema = {
  description: 'List of dating ideas with astrological compatibility',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        description: 'Title of the dating idea',
        nullable: false,
      },
      description: {
        type: SchemaType.STRING,
        description: 'Detailed explanation of the dating idea',
        nullable: false,
      },
      location: {
        type: SchemaType.STRING,
        description: 'Recommended location for the date. No need to specify exact location, just cafe or museum is ok.',
        nullable: false,
      },
      date: {
        type: SchemaType.STRING,
        description: `Recommended date and time for the idea. It needs to be in the range of ${today} to ${dateInAMonth}.`,
        nullable: false,
      },
      astrologicalMatch: {
        type: SchemaType.OBJECT,
        description: 'Astrological compatibility notes',
        properties: {
          user1Details: {
            type: SchemaType.STRING,
            description: "Summary of user 1's astrological alignment",
            nullable: false,
          },
          user2Details: {
            type: SchemaType.STRING,
            description: "Summary of user 2's astrological alignment",
            nullable: false,
          },
          compatibilityNotes: {
            type: SchemaType.STRING,
            description: 'Compatibility notes between user 1 and user 2',
            nullable: false,
          },
        },
        required: ['user1Details', 'user2Details', 'compatibilityNotes'],
      },
    },
    required: ['title', 'description', 'location', 'date', 'astrologicalMatch'],
  },
};

export class IdeaService {
  private userService = new UserService();

  private model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  async getDatingIdeas(userId1: number, userId2: number): Promise<DatingIdea[]> {
    try {
      const user1 = await this.userService.getById(userId1);
      const user2 = await this.userService.getById(userId2);

      if (!user1 || !user2) {
        throw new Error('There is an error fetching user data.');
      }

      const input = {
        prompt: `Generate two romantic and compatible dating ideas based on the following astrological data:\nUser 1: ${JSON.stringify(user1.PlanetaryPosition)}\nUser 2: ${JSON.stringify(user2.PlanetaryPosition)}\n\nProvide detailed recommendations, including date, time, and location.`,
      };

      const result = await this.model.generateContent(input.prompt);
      const response = await result.response;
      const text: string = await response.text();

      const ideas = JSON.parse(text);

      if (!ideas) {
        throw new Error('Failed to generate dating ideas.');
      }

      return ideas as unknown as DatingIdea[];
    } catch (error) {
      console.error('Error generating dating ideas:', error);

      // Fallback ideas in case of failure
      return [
        {
          title: 'Stargazing Night',
          description: 'Enjoy a peaceful night under the stars with a telescope and some hot cocoa.',
          location: 'Local park or open field',
          date: 'Next clear evening',
          astrologicalMatch: {
            user1Details: 'User 1 loves tranquility and romantic settings.',
            user2Details: 'User 2 enjoys deep conversations and nature.',
            compatibilityNotes: 'Perfect for creating a serene and intimate connection.',
          },
        },
        {
          title: 'Art and Wine Evening',
          description: 'Attend a local art class together while sipping on your favorite wines.',
          location: 'Art studio or community center',
          date: 'Upcoming weekend evening',
          astrologicalMatch: {
            user1Details: 'User 1 appreciates creativity and new experiences.',
            user2Details: 'User 2 enjoys hands-on activities and relaxation.',
            compatibilityNotes: 'Combines creativity and relaxation for a delightful evening.',
          },
        },
      ];
    }
  }
}
