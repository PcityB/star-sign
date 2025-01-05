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
}
