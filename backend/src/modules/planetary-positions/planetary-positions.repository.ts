import { PrismaClient } from '@prisma/client';
import { PlanetaryPositionDTO } from './planetary-positions.model';
import { BaseRepository } from '~/libs/core/base-repository';

export class PlanetaryPositionRepository extends BaseRepository<
  PlanetaryPositionDTO,
  PlanetaryPositionDTO[],
  Partial<PlanetaryPositionDTO>,
  Partial<PlanetaryPositionDTO>
> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'planetaryPosition');
  }

  async createOrUpdate(data: Partial<PlanetaryPositionDTO>): Promise<PlanetaryPositionDTO> {
    const existingPosition = await this.prisma.planetaryPosition.findFirst({
      where: { userId: data.userId }, // Assuming userId is the unique identifier
    });

    if (existingPosition) {
      // If an existing planetary position is found, update it
      return await this.prisma.planetaryPosition.update({
        where: { id: existingPosition.id },
        data,
      });
    } else {
      // If no existing position is found, create a new one
      return await this.prisma.planetaryPosition.create({
        data,
      });
    }
  }
}
