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
    const authString = Buffer.from(`${process.env.ASTRONOMY_API_ID}:${process.env.ASTRONOMY_API_SECRET}`).toString(
      'base64',
    );

    try {
      const response = await axios.get('https://api.astronomyapi.com/api/v2/bodies/positions', {
        headers: {
          Authorization: `Basic ${authString}`,
        },
        params,
      });

      return response.data.data.table.rows;
    } catch (error) {
      console.error(error);
    }
  }

  private calculateSunSign(declination: number): string {
    const zodiacSigns = [
      'Capricorn',
      'Aquarius',
      'Pisces',
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
    ];
    const signIndex = Math.floor((declination + 360) / 30) % 12;
    return zodiacSigns[signIndex];
  }

  private calculateMoonSign(declination: number): string {
    return this.calculateSunSign(declination);
  }

  private calculateAscendant(longitude: number, lst: number): string {
    const zodiacSigns = [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ];
    const ascendantDegrees = (lst + longitude) % 360;
    const signIndex = Math.floor(ascendantDegrees / 30);
    return zodiacSigns[signIndex];
  }

  private calculateHouse(
    planetLongitude: number,
    ascendantDegrees: number,
  ): { houseNumber: number; houseName: string } {
    const adjustedDegrees = (planetLongitude - ascendantDegrees + 360) % 360;
    const houseNumber = Math.floor(adjustedDegrees / 30) + 1;
    const houseNames = [
      'First House',
      'Second House',
      'Third House',
      'Fourth House',
      'Fifth House',
      'Sixth House',
      'Seventh House',
      'Eighth House',
      'Ninth House',
      'Tenth House',
      'Eleventh House',
      'Twelfth House',
    ];
    return { houseNumber, houseName: houseNames[houseNumber - 1] };
  }

  public async calculatePlanetaryPositions(
    userId: number,
    latitude: string,
    longitude: string,
    date: Date
  ): Promise<void> {
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toISOString().split('T')[1].split('.')[0];
  
    const userParams = {
      latitude,
      longitude,
      elevation: '0',
      from_date: formattedDate,
      to_date: formattedDate,
      time: formattedTime,
    };

    const planetaryData = await this.queryAstronomyAPI(userParams);

    const sunData = planetaryData.find((row: any) => row.entry.id === 'sun').cells[0];
    const moonData = planetaryData.find((row: any) => row.entry.id === 'moon').cells[0];

    const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    const planetPositions = planets.map((planet) => {
      const planetData = planetaryData.find((row: any) => row.entry.id === planet)?.cells[0];
      const { houseNumber, houseName } = this.calculateHouse(
        parseFloat(planetData.position.equatorial.rightAscension.hours) * 15,
        parseFloat(sunData.position.horizontal.azimuth.degrees),
      );
      return {
        planet,
        ra: planetData.position.equatorial.rightAscension.string,
        houseNumber,
        houseName,
      };
    });

    const sunSign = this.calculateSunSign(parseFloat(sunData.position.equatorial.declination.degrees));
    const moonSign = this.calculateMoonSign(parseFloat(moonData.position.equatorial.declination.degrees));
    const ascendant = this.calculateAscendant(
      parseFloat(userParams.longitude),
      parseFloat(sunData.position.horizontal.azimuth.degrees),
    );

    const data = {
      userId,
      sunSign,
      moonSign,
      ascendant,
      sunPosition: `${sunData.position.equatorial.rightAscension.string}, 1, First House`,
      moonPosition: `${moonData.position.equatorial.rightAscension.string}, 2, Second House`,
      mercury: `${planetPositions[0].ra}, ${planetPositions[0].houseNumber}, ${planetPositions[0].houseName}`,
      venus: `${planetPositions[1].ra}, ${planetPositions[1].houseNumber}, ${planetPositions[1].houseName}`,
      mars: `${planetPositions[2].ra}, ${planetPositions[2].houseNumber}, ${planetPositions[2].houseName}`,
      jupiter: `${planetPositions[3].ra}, ${planetPositions[3].houseNumber}, ${planetPositions[3].houseName}`,
      saturn: `${planetPositions[4].ra}, ${planetPositions[4].houseNumber}, ${planetPositions[4].houseName}`,
      uranus: `${planetPositions[5].ra}, ${planetPositions[5].houseNumber}, ${planetPositions[5].houseName}`,
      neptune: `${planetPositions[6].ra}, ${planetPositions[6].houseNumber}, ${planetPositions[6].houseName}`,
      pluto: `${planetPositions[7].ra}, ${planetPositions[7].houseNumber}, ${planetPositions[7].houseName}`,
    };

    await this.planetaryPositionRepository.create(data);
  }
}

export { PlanetaryPositionService };
