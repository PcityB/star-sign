import { PrismaClient } from '@prisma/client';
import { SignUpRequestDTO, UserDTO, UserPatchRequestDTO } from './user.model';
import { BaseRepository } from '~/libs/core/base-repository';

class UserRepository extends BaseRepository<UserDTO, UserDTO[], SignUpRequestDTO, UserPatchRequestDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'user');
  }

  public async findByEmail(email: string): Promise<UserDTO | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async find(id: number | string): Promise<UserDTO | null> {
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        PlanetaryPosition: true,
      },
    }) as Promise<UserDTO | null>;
  }

  public async findUsersWithPreferences(preferences: {
    minAge: number;
    maxAge: number;
    gender?: string;
    currentCity?: string;
    currentCountry?: string;
    sunSign?: string;
    goals?: string[];
  }): Promise<UserDTO[]> {
    const { minAge, maxAge, gender, currentCity, currentCountry, sunSign, goals } = preferences;

    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          { birthTimestamp: { not: null } }, // Ensure birthTimestamp exists
          {
            birthTimestamp: {
              gte: new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)),
              lte: new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
            },
          },
          gender ? { gender } : {},
          currentCity ? { birthCity: currentCity } : {},
          currentCountry ? { birthCountry: currentCountry } : {},
          sunSign ? { PlanetaryPosition: { some: { sunSign } } } : {},
          goals && goals.length > 0
            ? {
                Preference: {
                  goals: {
                    some: {
                      name: { in: goals },
                    },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        PlanetaryPosition: true,
        Preference: {
          include: {
            goals: true,
          },
        },
      },
    });

    return users;
  }


}

export { UserRepository };
