import { PrismaClient } from '@prisma/client';
import { MatchDTO, MatchCreateRequestDTO } from './match.model';
import { BaseRepository } from '~/libs/core/base-repository';

export class MatchRepository extends BaseRepository<
  MatchDTO,
  MatchDTO[],
  Partial<MatchCreateRequestDTO>,
  Partial<MatchCreateRequestDTO>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'match');
  }

  async createOrUpdate(data: Partial<MatchCreateRequestDTO>): Promise<Partial<MatchCreateRequestDTO>> {
    const existingMatch = await this.prisma.match.findFirst({
      where: {
        OR: [
          { userId1: data.userId1, userId2: data.userId2 },
          { userId1: data.userId2, userId2: data.userId1 },
        ],
      },
    });
    if (existingMatch) {
      return await this.prisma.match.update({
        where: { id: existingMatch.id },
        data: {isAccepted: true},
      });
    } else {
      return await this.prisma.match.create({
        data,
      });
    }
  }

  public async findByUserId(userId: number): Promise<MatchDTO[] | null> {
    return this.prisma.match.findMany({
      where: {
        OR: [{ userId1: userId }, { userId2: userId }],
      },
      include: {
        user1: {
          include: {
            Preference: true,
            PlanetaryPosition: true
          },
        },
        user2: {
          include: {
            Preference: true,
            PlanetaryPosition: true
          },
        },
      },
    });
  }  
}
