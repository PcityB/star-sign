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
    });
  
    // Handle nested relations for goals and interests
    const { goals, interests, ...preferenceData } = data;
  
    const createData: any = {
      ...preferenceData,
      ...(goals && goals.length > 0
        ? { goals: { connect: goals.map((id) => ({ id })) } }
        : {}), // Connect existing goals by their IDs or omit if empty
      ...(interests && interests.length > 0
        ? { interests: { connect: interests.map((id) => ({ id })) } }
        : {}), // Connect existing interests by their IDs or omit if empty
    };
  
    if (existingPreference) {
      return await this.prisma.preference.update({
        where: { id: existingPreference.id },
        data: createData,
      });
    } else {
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
