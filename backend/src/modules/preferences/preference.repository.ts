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

    if (existingPreference) {
      return await this.prisma.preference.update({
        where: { id: existingPreference.id },
        data,
      });
    } else {
      return await this.prisma.preference.create({
        data,
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
