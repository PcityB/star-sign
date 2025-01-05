import { PlanetaryPositionDTO } from './planetary-positions.model';
import prisma from '~/libs/prisma/prisma-client';
import { PlanetaryPositionRepository } from './planetary-positions.repository';
import axios from 'axios';

class PlanetaryPositionService {
  private planetaryPositionRepository = new PlanetaryPositionRepository(prisma);

  public async queryAstronomyAPI(params: {
    latitude: string;
    longitude: string;
    elevation: string;
    from_date: string;
    to_date: string;
    time: string;
  }) {
    const authString = Buffer.from(`${process.env.ASTRONOMY_API_ID}:${process.env.ASTRONOMY_API_SECRET}`).toString('base64');

    try {
      const response = await axios.get('https://api.astronomyapi.com/api/v2/bodies/positions', {
        headers: {
          Authorization: `Basic ${authString}`,
        },
        params,
      });

      return response.data.data.table.rows;
    } catch (error) {
      throw { status: 500, errors: 'Failed to fetch planetary positions.' };
    }
  }
}

export { PlanetaryPositionService };
