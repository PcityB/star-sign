import prisma from '~/libs/prisma/prisma-client';
import { GoalRepository, InterestRepository } from './attribute.repository';

export class AttributeService {
  private goalRepository: GoalRepository;
  private interestRepository: InterestRepository;

  constructor() {
    this.goalRepository = new GoalRepository(prisma);
    this.interestRepository = new InterestRepository(prisma);
  }

  async getAllGoals() {
    return this.goalRepository.findAll();
  }

  async getAllInterests() {
    return this.interestRepository.findAll();
  }
}
