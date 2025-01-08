import { PrismaClient } from '@prisma/client';
import { MessageDTO } from './chat.model';
import { BaseRepository } from '~/libs/core/base-repository';

export class PlanetaryPositionRepository extends BaseRepository<
  MessageDTO,
  MessageDTO[],
  Partial<MessageDTO>,
  Partial<MessageDTO>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'message');
  }

  async getAllMessagesBetweenUsers(userId1: number, userId2: number): Promise<MessageDTO[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId1, recipientId: userId2 },
          { senderId: userId2, recipientId: userId1 },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
