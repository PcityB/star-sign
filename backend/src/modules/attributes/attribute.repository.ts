import { PrismaClient } from '@prisma/client';
import { GoalDTO, InterestDTO } from './attribute.model';

class GoalRepository {
  constructor(protected prisma: PrismaClient) {}

  public async findAll(): Promise<GoalDTO[]> {
    return this.prisma.goal.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<GoalDTO[]>;
  }
}

class InterestRepository {
  constructor(protected prisma: PrismaClient) {}

  public async findAll(): Promise<InterestDTO[]> {
    return this.prisma.interest.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<InterestDTO[]>;
  }
}

export { GoalRepository, InterestRepository };
