import { PrismaClient } from '@prisma/client';
import { PreferenceCreateRequestDTO, PreferenceDTO } from './preference.model';
import { BaseRepository } from '~/libs/core/base-repository';

export class PreferenceRepository extends BaseRepository<
  PreferenceDTO,
  PreferenceDTO[],
  Partial<PreferenceCreateRequestDTO>,
  Partial<PreferenceCreateRequestDTO>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'preference');
  }

  async createOrUpdate(data: Partial<PreferenceCreateRequestDTO>): Promise<Partial<PreferenceCreateRequestDTO>> {
    const existingPreference = await this.prisma.preference.findFirst({
      where: { userId: data.userId },
      include: {
        goals: true,    // Include the existing goals for comparison
        interests: true // Include the existing interests for comparison
      }
    });
  
    // Handle nested relations for goals and interests
    const { goals, interests, ...preferenceData } = data;
  
    const createData: any = {
      ...preferenceData,
      // Connect new or existing goals
      ...(goals && goals.length > 0 ? { goals: { connect: goals.map((id) => ({ id })) } } : {}),
      // Connect new or existing interests
      ...(interests && interests.length > 0 ? { interests: { connect: interests.map((id) => ({ id })) } } : {}),
    };
  
    if (existingPreference) {
      // Remove the goals and interests that are not part of the updated list
      if (goals) {
        // Get the IDs of the existing goals
        const existingGoalIds = existingPreference.goals.map((goal) => goal.id);
        const newGoalIds = goals;
  
        // Find the goal IDs to disconnect (those that are no longer in the new list)
        const goalsToDisconnect = existingGoalIds.filter((goalId) => !newGoalIds.includes(goalId));
  
        // If there are goals to disconnect, remove them from the relation
        if (goalsToDisconnect.length > 0) {
          createData.goals = {
            ...createData.goals,
            disconnect: goalsToDisconnect.map((id) => ({ id })),
          };
        }
      }
  
      if (interests) {
        // Get the IDs of the existing interests
        const existingInterestIds = existingPreference.interests.map((interest) => interest.id);
        const newInterestIds = interests;
  
        // Find the interest IDs to disconnect (those that are no longer in the new list)
        const interestsToDisconnect = existingInterestIds.filter((interestId) => !newInterestIds.includes(interestId));
  
        // If there are interests to disconnect, remove them from the relation
        if (interestsToDisconnect.length > 0) {
          createData.interests = {
            ...createData.interests,
            disconnect: interestsToDisconnect.map((id) => ({ id })),
          };
        }
      }
  
      // Update the existing preference
      return await this.prisma.preference.update({
        where: { id: existingPreference.id },
        data: createData,
      });
    } else {
      // Create a new preference if it doesn't exist
      return await this.prisma.preference.create({
        data: createData,
      });
    }
  }  

  public async findByUserId(userId: number): Promise<PreferenceDTO | null> {
    return this.prisma.preference.findUnique({
      where: { userId },
      include: {
        goals: true,
        interests: true,
      },
    });
  }
}
