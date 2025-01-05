import { PlanetaryPositionDTO } from './planetary-positions.model';
import prisma from '~/libs/prisma/prisma-client';
import { PlanetaryPositionRepository } from './planetary-positions.repository';
import axios from 'axios';

class PlanetaryPositionService {
  private planetaryPositionRepository = new PlanetaryPositionRepository(prisma);

  private calculateJulianDay(date: Date): number {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1; // getUTCMonth is zero-based
    const day = date.getUTCDate();

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    const jd =
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      day +
      B -
      1524.5;

    const timeFraction =
      (date.getUTCHours() +
        date.getUTCMinutes() / 60 +
        date.getUTCSeconds() / 3600) /
      24;

    return jd + timeFraction;
  }

  private calculateLocalSiderealTime(julianDay: number, longitude: number): number {
    const JD0 = Math.floor(julianDay - 0.5) + 0.5; // JD at previous midnight
    const H = (julianDay - JD0) * 24; // Hours since last midnight
    const D = JD0 - 2451545.0; // Days since J2000.0 at midnight

    const GMSTMidnight = (280.46061837 + 360.98564736629 * D) % 360;
    const GMST = (GMSTMidnight + 360.98564736629 * (H / 24)) % 360;

    const LST = (GMST + longitude) % 360;
    return LST >= 0 ? LST : LST + 360; // Normalize to [0, 360)
  }

  private calculateAscendant(lst: number, latitude: number): number {
    const lstRad = (lst * Math.PI) / 180; // Convert LST from degrees to radians
    const latRad = (latitude * Math.PI) / 180; // Convert latitude from degrees to radians
  
    const epsilon = (23.4397 * Math.PI) / 180; // Obliquity of the ecliptic in radians
  
    // Calculate the ascendant in radians
    const ascendantRad = Math.atan2(
      Math.cos(lstRad),
      -Math.sin(lstRad) * Math.cos(epsilon) - Math.tan(latRad) * Math.sin(epsilon)
    );
  
    // Convert the ascendant to degrees and normalize to [0, 360)
    const ascendantDeg = (ascendantRad * 180) / Math.PI;
    return ascendantDeg >= 0 ? ascendantDeg : ascendantDeg + 360;
  }  

  private calculateZodiacSign(degrees: number): string {
    const zodiacSigns = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
    ];
    const index = Math.floor(degrees / 30) % 12;
    return zodiacSigns[index];
  }

  private calculateHouse(positionDegrees: number, ascendantDegrees: number): number {
    // Normalize position to the Ascendant's coordinate system
    const normalizedPosition = (positionDegrees - ascendantDegrees + 360) % 360;
  
    // Calculate house index (1-based)
    const houseIndex = Math.floor(normalizedPosition / 30) + 1;
  
    return houseIndex;
  }
  

  public async calculatePlanetaryPositions(
    userId: number,
    latitude: string,
    longitude: string,
    date: Date
  ): Promise<void> {
    // Format the Date object into the required API format
    const formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
    const formattedTime = date.toISOString().split('T')[1].split('.')[0]; // Extract HH:MM:SS
  
    const userParams = {
      latitude,
      longitude,
      elevation: '0',
      from_date: formattedDate,
      to_date: formattedDate,
      time: formattedTime,
    };

    const planetaryData = await this.queryAstronomyAPI(userParams);

    // Extract Sun and Moon data
    const sunData = planetaryData.find((row: any) => row.entry.id === 'sun').cells[0];
    const moonData = planetaryData.find((row: any) => row.entry.id === 'moon').cells[0];

    const sunRA = parseFloat(sunData.position.equatorial.rightAscension.hours) * 15;
    const moonRA = parseFloat(moonData.position.equatorial.rightAscension.hours) * 15;

    // Calculate Julian Day and LST
    const observationDate = new Date(`${userParams.from_date}T${userParams.time}Z`);
    const julianDay = this.calculateJulianDay(observationDate);
    const lst = this.calculateLocalSiderealTime(julianDay, parseFloat(userParams.longitude));

    // Calculate Ascendant and Signs
    const observerLatitude = parseFloat(userParams.latitude);
    const ascendant = this.calculateAscendant(lst, observerLatitude);
    const sunSign = this.calculateZodiacSign(sunRA);
    const moonSign = this.calculateZodiacSign(moonRA);
    const ascendantSign = this.calculateZodiacSign(ascendant);

    // Prepare Planetary Data
    const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'sun', 'moon'];
    const planetPositions = planets.map((planet) => {
      const planetData = planetaryData.find((row: any) => row.entry.id === planet)?.cells[0];
      const planetRA = parseFloat(planetData.position.equatorial.rightAscension.hours) * 15;
      const house = this.calculateHouse(planetRA, ascendant);
    
      return `${planetRA}, ${house}, ${this.calculateZodiacSign(planetRA)}`;
    });
    

    const data = {
      userId,
      sunSign,
      moonSign,
      ascendant: ascendantSign,
      sunPosition: planetPositions[8],
      moonPosition: planetPositions[9],
      mercury: planetPositions[0],
      venus: planetPositions[1],
      mars: planetPositions[2],
      jupiter: planetPositions[3],
      saturn: planetPositions[4],
      uranus: planetPositions[5],
      neptune: planetPositions[6],
      pluto: planetPositions[7],
    };

    await this.planetaryPositionRepository.createOrUpdate(data);
  }

  private async queryAstronomyAPI(params: {
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
