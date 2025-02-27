import { PrismaClient } from '@prisma/client';
import { Gender, SignUpRequestDTO, UserDTO, UserPatchRequestDTO } from './user.model';
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
        Preference: {
          include: {
            goals: true,
            interests: true,
          },
        },
      },
    }) as Promise<UserDTO | null>;
  }

  public async findUsersWithPreferences(preferences: {
    minAge: number;
    maxAge: number;
    userGender?: Gender | null;
    gender?: string;
    currentCity?: string;
    currentCountry?: string;
    sunSign?: string;
    moonSign?: string;
    goals?: number[];
  }): Promise<UserDTO[]> {
    const { minAge, maxAge, userGender, gender, currentCity, currentCountry, sunSign, moonSign, goals } = preferences;

    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          { birthTimestamp: { not: null } },
          {
            birthTimestamp: {
              gte: new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)),
              lte: new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
            },
          },
          ...(gender ? [{ gender }] : []),
          ...(currentCity
            ? [
                {
                  Preference: {
                    currentCity,
                  },
                },
              ]
            : []),
          ...(currentCountry
            ? [
                {
                  Preference: {
                    currentCountry,
                  },
                },
              ]
            : []),
          ...(sunSign ? [{ PlanetaryPosition: { some: { sunSign } } }] : []),
          ...(moonSign ? [{ PlanetaryPosition: { some: { moonSign } } }] : []),
          ...(goals && goals.length > 0
            ? [
                {
                  Preference: {
                    goals: {
                      some: {
                        id: { in: goals },
                      },
                    },
                  },
                },
              ]
            : []),
          ...(userGender
            ? [
                {
                  Preference: {
                    gender: userGender,
                  },
                },
              ]
            : []),
        ],
      },
      include: {
        PlanetaryPosition: true,
        Preference: {
          include: {
            goals: true,
            interests: true,
          },
        },
      },
    });

    return users;
  }
}

export { UserRepository };
