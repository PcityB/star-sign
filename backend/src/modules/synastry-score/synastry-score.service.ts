import { PlanetaryPositionDTO } from '../planetary-positions/planetary-positions.model';

type CelestialBody = {
  name: string;
  ra: number;
};

type PlanetaryAspect = {
  planet1: string;
  planet2: string;
  aspect: string;
  score: number;
};

type AspectRange = {
  name: string;
  minAngle: number;
  maxAngle: number;
};

const aspectRanges: AspectRange[] = [
  { name: 'conjunction', minAngle: 0, maxAngle: 10 },
  { name: 'sextile', minAngle: 60, maxAngle: 70 },
  { name: 'trine', minAngle: 120, maxAngle: 130 },
  { name: 'square', minAngle: 90, maxAngle: 100 },
  { name: 'opposition', minAngle: 170, maxAngle: 180 },
];

const planetaryAspects: PlanetaryAspect[] = [
  { planet1: 'Sun', planet2: 'Sun', aspect: 'conjunction', score: 1 },
  { planet1: 'Sun', planet2: 'Sun', aspect: 'trine', score: 3 },
  { planet1: 'Sun', planet2: 'Sun', aspect: 'sextile', score: 3 },
  { planet1: 'Sun', planet2: 'Sun', aspect: 'square', score: -2 },
  { planet1: 'Sun', planet2: 'Sun', aspect: 'opposition', score: 2 },
  { planet1: 'Sun', planet2: 'Moon', aspect: 'conjunction', score: 3 },
  { planet1: 'Sun', planet2: 'Moon', aspect: 'trine', score: 3 },
  { planet1: 'Sun', planet2: 'Moon', aspect: 'sextile', score: 3 },
  { planet1: 'Sun', planet2: 'Moon', aspect: 'square', score: -3 },
  { planet1: 'Sun', planet2: 'Moon', aspect: 'opposition', score: 2 },
  { planet1: 'Sun', planet2: 'Mercury', aspect: 'conjunction', score: 2 },
  { planet1: 'Sun', planet2: 'Mercury', aspect: 'sextile', score: 2 },
  { planet1: 'Sun', planet2: 'Mercury', aspect: 'trine', score: 2 },
  { planet1: 'Sun', planet2: 'Mercury', aspect: 'square', score: -1 },
  { planet1: 'Sun', planet2: 'Mercury', aspect: 'opposition', score: -1 },
  { planet1: 'Sun', planet2: 'Venus', aspect: 'conjunction', score: 3 },
  { planet1: 'Sun', planet2: 'Venus', aspect: 'trine', score: 3 },
  { planet1: 'Sun', planet2: 'Venus', aspect: 'sextile', score: 2 },
  { planet1: 'Sun', planet2: 'Venus', aspect: 'square', score: -1 },
  { planet1: 'Sun', planet2: 'Venus', aspect: 'opposition', score: -1 },
  { planet1: 'Sun', planet2: 'Mars', aspect: 'conjunction', score: 2 },
  { planet1: 'Sun', planet2: 'Mars', aspect: 'trine', score: 3 },
  { planet1: 'Sun', planet2: 'Mars', aspect: 'sextile', score: 3 },
  { planet1: 'Sun', planet2: 'Mars', aspect: 'square', score: -2 },
  { planet1: 'Sun', planet2: 'Mars', aspect: 'opposition', score: -2 },
  { planet1: 'Sun', planet2: 'Jupiter', aspect: 'conjunction', score: 3 },
  { planet1: 'Sun', planet2: 'Jupiter', aspect: 'trine', score: 3 },
  { planet1: 'Sun', planet2: 'Jupiter', aspect: 'sextile', score: 3 },
  { planet1: 'Sun', planet2: 'Jupiter', aspect: 'square', score: 1 },
  { planet1: 'Sun', planet2: 'Jupiter', aspect: 'opposition', score: 1 },
  { planet1: 'Sun', planet2: 'Saturn', aspect: 'conjunction', score: -2 },
  { planet1: 'Sun', planet2: 'Saturn', aspect: 'trine', score: 3 },
  { planet1: 'Sun', planet2: 'Saturn', aspect: 'sextile', score: 3 },
  { planet1: 'Sun', planet2: 'Saturn', aspect: 'square', score: -2 },
  { planet1: 'Sun', planet2: 'Saturn', aspect: 'opposition', score: -2 },
  { planet1: 'Sun', planet2: 'Uranus', aspect: 'conjunction', score: -1 },
  { planet1: 'Sun', planet2: 'Uranus', aspect: 'trine', score: 2 },
  { planet1: 'Sun', planet2: 'Uranus', aspect: 'sextile', score: 2 },
  { planet1: 'Sun', planet2: 'Uranus', aspect: 'square', score: -1 },
  { planet1: 'Sun', planet2: 'Uranus', aspect: 'opposition', score: -1 },
  { planet1: 'Sun', planet2: 'Neptune', aspect: 'conjunction', score: -2 },
  { planet1: 'Sun', planet2: 'Neptune', aspect: 'trine', score: 1 },
  { planet1: 'Sun', planet2: 'Neptune', aspect: 'sextile', score: 1 },
  { planet1: 'Sun', planet2: 'Neptune', aspect: 'square', score: -2 },
  { planet1: 'Sun', planet2: 'Neptune', aspect: 'opposition', score: -2 },
  { planet1: 'Sun', planet2: 'Pluto', aspect: 'conjunction', score: 1 },
  { planet1: 'Sun', planet2: 'Pluto', aspect: 'trine', score: 1 },
  { planet1: 'Sun', planet2: 'Pluto', aspect: 'sextile', score: 1 },
  { planet1: 'Sun', planet2: 'Pluto', aspect: 'square', score: -2 },
  { planet1: 'Sun', planet2: 'Pluto', aspect: 'opposition', score: -2 },
  { planet1: 'Moon', planet2: 'Moon', aspect: 'conjunction', score: 3 },
  { planet1: 'Moon', planet2: 'Moon', aspect: 'sextile', score: 3 },
  { planet1: 'Moon', planet2: 'Moon', aspect: 'trine', score: 3 },
  { planet1: 'Moon', planet2: 'Moon', aspect: 'square', score: -3 },
  { planet1: 'Moon', planet2: 'Moon', aspect: 'opposition', score: 1 },
  { planet1: 'Moon', planet2: 'Mercury', aspect: 'conjunction', score: 2 },
  { planet1: 'Moon', planet2: 'Mercury', aspect: 'sextile', score: 2 },
  { planet1: 'Moon', planet2: 'Mercury', aspect: 'trine', score: 2 },
  { planet1: 'Moon', planet2: 'Mercury', aspect: 'square', score: -2 },
  { planet1: 'Moon', planet2: 'Mercury', aspect: 'opposition', score: -2 },
  { planet1: 'Moon', planet2: 'Venus', aspect: 'conjunction', score: 3 },
  { planet1: 'Moon', planet2: 'Venus', aspect: 'sextile', score: 3 },
  { planet1: 'Moon', planet2: 'Venus', aspect: 'trine', score: 3 },
  { planet1: 'Moon', planet2: 'Venus', aspect: 'square', score: 1 },
  { planet1: 'Moon', planet2: 'Venus', aspect: 'opposition', score: 1 },
  { planet1: 'Moon', planet2: 'Mars', aspect: 'conjunction', score: -1 },
  { planet1: 'Moon', planet2: 'Mars', aspect: 'sextile', score: 3 },
  { planet1: 'Moon', planet2: 'Mars', aspect: 'trine', score: 3 },
  { planet1: 'Moon', planet2: 'Mars', aspect: 'square', score: -3 },
  { planet1: 'Moon', planet2: 'Mars', aspect: 'opposition', score: -2 },
  { planet1: 'Moon', planet2: 'Jupiter', aspect: 'conjunction', score: 3 },
  { planet1: 'Moon', planet2: 'Jupiter', aspect: 'sextile', score: 3 },
  { planet1: 'Moon', planet2: 'Jupiter', aspect: 'trine', score: 3 },
  { planet1: 'Moon', planet2: 'Jupiter', aspect: 'square', score: 1 },
  { planet1: 'Moon', planet2: 'Jupiter', aspect: 'opposition', score: 1 },
  { planet1: 'Moon', planet2: 'Saturn', aspect: 'sextile', score: 3 },
  { planet1: 'Moon', planet2: 'Saturn', aspect: 'trine', score: 3 },
  { planet1: 'Moon', planet2: 'Saturn', aspect: 'square', score: -4 },
  { planet1: 'Moon', planet2: 'Saturn', aspect: 'conjunction', score: -3 },
  { planet1: 'Moon', planet2: 'Saturn', aspect: 'opposition', score: -3 },
  { planet1: 'Moon', planet2: 'Uranus', aspect: 'conjunction', score: -1 },
  { planet1: 'Moon', planet2: 'Uranus', aspect: 'sextile', score: 2 },
  { planet1: 'Moon', planet2: 'Uranus', aspect: 'trine', score: 2 },
  { planet1: 'Moon', planet2: 'Uranus', aspect: 'square', score: -2 },
  { planet1: 'Moon', planet2: 'Uranus', aspect: 'opposition', score: -2 },
  { planet1: 'Moon', planet2: 'Neptune', aspect: 'conjunction', score: 1 },
  { planet1: 'Moon', planet2: 'Neptune', aspect: 'sextile', score: 2 },
  { planet1: 'Moon', planet2: 'Neptune', aspect: 'trine', score: 2 },
  { planet1: 'Moon', planet2: 'Neptune', aspect: 'square', score: -3 },
  { planet1: 'Moon', planet2: 'Neptune', aspect: 'opposition', score: -3 },
  { planet1: 'Moon', planet2: 'Pluto', aspect: 'conjunction', score: 1 },
  { planet1: 'Moon', planet2: 'Pluto', aspect: 'sextile', score: 2 },
  { planet1: 'Moon', planet2: 'Pluto', aspect: 'trine', score: 2 },
  { planet1: 'Moon', planet2: 'Pluto', aspect: 'square', score: -3 },
  { planet1: 'Moon', planet2: 'Pluto', aspect: 'opposition', score: -3 },
  { planet1: 'Mercury', planet2: 'Mercury', aspect: 'sextile', score: 2 },
  { planet1: 'Mercury', planet2: 'Mercury', aspect: 'conjunction', score: 2 },
  { planet1: 'Mercury', planet2: 'Mercury', aspect: 'trine', score: 2 },
  { planet1: 'Mercury', planet2: 'Mercury', aspect: 'square', score: -4 },
  { planet1: 'Mercury', planet2: 'Mercury', aspect: 'opposition', score: -2 },
  { planet1: 'Mercury', planet2: 'Venus', aspect: 'conjunction', score: 2 },
  { planet1: 'Mercury', planet2: 'Venus', aspect: 'sextile', score: 2 },
  { planet1: 'Mercury', planet2: 'Venus', aspect: 'trine', score: 2 },
  { planet1: 'Mercury', planet2: 'Venus', aspect: 'square', score: -1 },
  { planet1: 'Mercury', planet2: 'Venus', aspect: 'opposition', score: -1 },
  { planet1: 'Mercury', planet2: 'Mars', aspect: 'conjunction', score: -1 },
  { planet1: 'Mercury', planet2: 'Mars', aspect: 'sextile', score: 2 },
  { planet1: 'Mercury', planet2: 'Mars', aspect: 'trine', score: 2 },
  { planet1: 'Mercury', planet2: 'Mars', aspect: 'square', score: -2 },
  { planet1: 'Mercury', planet2: 'Mars', aspect: 'opposition', score: -2 },
  { planet1: 'Mercury', planet2: 'Jupiter', aspect: 'conjunction', score: 3 },
  { planet1: 'Mercury', planet2: 'Jupiter', aspect: 'sextile', score: 3 },
  { planet1: 'Mercury', planet2: 'Jupiter', aspect: 'trine', score: 3 },
  { planet1: 'Mercury', planet2: 'Jupiter', aspect: 'square', score: 1 },
  { planet1: 'Mercury', planet2: 'Jupiter', aspect: 'opposition', score: 1 },
  { planet1: 'Mercury', planet2: 'Saturn', aspect: 'conjunction', score: -2 },
  { planet1: 'Mercury', planet2: 'Saturn', aspect: 'square', score: -2 },
  { planet1: 'Mercury', planet2: 'Saturn', aspect: 'opposition', score: -2 },
  { planet1: 'Mercury', planet2: 'Saturn', aspect: 'sextile', score: 1 },
  { planet1: 'Mercury', planet2: 'Saturn', aspect: 'trine', score: 1 },
  { planet1: 'Mercury', planet2: 'Uranus', aspect: 'conjunction', score: 1 },
  { planet1: 'Mercury', planet2: 'Uranus', aspect: 'square', score: 1 },
  { planet1: 'Mercury', planet2: 'Uranus', aspect: 'opposition', score: 1 },
  { planet1: 'Mercury', planet2: 'Uranus', aspect: 'sextile', score: 1 },
  { planet1: 'Mercury', planet2: 'Uranus', aspect: 'trine', score: 1 },
  { planet1: 'Mercury', planet2: 'Neptune', aspect: 'sextile', score: 1 },
  { planet1: 'Mercury', planet2: 'Neptune', aspect: 'trine', score: 1 },
  { planet1: 'Mercury', planet2: 'Neptune', aspect: 'square', score: -3 },
  { planet1: 'Mercury', planet2: 'Neptune', aspect: 'opposition', score: -3 },
  { planet1: 'Mercury', planet2: 'Pluto', aspect: 'conjunction', score: 1 },
  { planet1: 'Mercury', planet2: 'Pluto', aspect: 'square', score: 1 },
  { planet1: 'Mercury', planet2: 'Pluto', aspect: 'opposition', score: 1 },
  { planet1: 'Mercury', planet2: 'Pluto', aspect: 'sextile', score: 1 },
  { planet1: 'Mercury', planet2: 'Pluto', aspect: 'trine', score: 1 },
  { planet1: 'Venus', planet2: 'Venus', aspect: 'conjunction', score: 3 },
  { planet1: 'Venus', planet2: 'Venus', aspect: 'sextile', score: 3 },
  { planet1: 'Venus', planet2: 'Venus', aspect: 'trine', score: 3 },
  { planet1: 'Venus', planet2: 'Venus', aspect: 'square', score: 1 },
  { planet1: 'Venus', planet2: 'Venus', aspect: 'opposition', score: 3 },

  { planet1: 'Venus', planet2: 'Mars', aspect: 'conjunction', score: 3 },
  { planet1: 'Venus', planet2: 'Mars', aspect: 'sextile', score: 3 },
  { planet1: 'Venus', planet2: 'Mars', aspect: 'trine', score: 3 },
  { planet1: 'Venus', planet2: 'Mars', aspect: 'square', score: 2 },
  { planet1: 'Venus', planet2: 'Mars', aspect: 'opposition', score: 2 },

  { planet1: 'Venus', planet2: 'Jupiter', aspect: 'conjunction', score: 3 },
  { planet1: 'Venus', planet2: 'Jupiter', aspect: 'trine', score: 2 },
  { planet1: 'Venus', planet2: 'Jupiter', aspect: 'sextile', score: 2 },
  { planet1: 'Venus', planet2: 'Jupiter', aspect: 'square', score: 1 },
  { planet1: 'Venus', planet2: 'Jupiter', aspect: 'opposition', score: 1 },

  { planet1: 'Venus', planet2: 'Saturn', aspect: 'conjunction', score: 2 },
  { planet1: 'Venus', planet2: 'Saturn', aspect: 'sextile', score: 3 },
  { planet1: 'Venus', planet2: 'Saturn', aspect: 'trine', score: 3 },
  { planet1: 'Venus', planet2: 'Saturn', aspect: 'square', score: -4 },
  { planet1: 'Venus', planet2: 'Saturn', aspect: 'opposition', score: -3 },

  { planet1: 'Venus', planet2: 'Uranus', aspect: 'conjunction', score: 1 },
  { planet1: 'Venus', planet2: 'Uranus', aspect: 'sextile', score: 2 },
  { planet1: 'Venus', planet2: 'Uranus', aspect: 'trine', score: 2 },
  { planet1: 'Venus', planet2: 'Uranus', aspect: 'square', score: -2 },
  { planet1: 'Venus', planet2: 'Uranus', aspect: 'opposition', score: -2 },

  { planet1: 'Venus', planet2: 'Neptune', aspect: 'conjunction', score: 2 },
  { planet1: 'Venus', planet2: 'Neptune', aspect: 'trine', score: 2 },
  { planet1: 'Venus', planet2: 'Neptune', aspect: 'sextile', score: 2 },
  { planet1: 'Venus', planet2: 'Neptune', aspect: 'square', score: -3 },
  { planet1: 'Venus', planet2: 'Neptune', aspect: 'opposition', score: -3 },

  { planet1: 'Venus', planet2: 'Pluto', aspect: 'conjunction', score: 2 },
  { planet1: 'Venus', planet2: 'Pluto', aspect: 'trine', score: 2 },
  { planet1: 'Venus', planet2: 'Pluto', aspect: 'sextile', score: 2 },
  { planet1: 'Venus', planet2: 'Pluto', aspect: 'square', score: -2 },
  { planet1: 'Venus', planet2: 'Pluto', aspect: 'opposition', score: -2 },

  { planet1: 'Mars', planet2: 'Mars', aspect: 'conjunction', score: 2 },
  { planet1: 'Mars', planet2: 'Mars', aspect: 'sextile', score: 2 },
  { planet1: 'Mars', planet2: 'Mars', aspect: 'trine', score: 2 },
  { planet1: 'Mars', planet2: 'Mars', aspect: 'square', score: -2 },
  { planet1: 'Mars', planet2: 'Mars', aspect: 'opposition', score: -2 },

  { planet1: 'Mars', planet2: 'Jupiter', aspect: 'conjunction', score: 2 },
  { planet1: 'Mars', planet2: 'Jupiter', aspect: 'sextile', score: 2 },
  { planet1: 'Mars', planet2: 'Jupiter', aspect: 'trine', score: 2 },
  { planet1: 'Mars', planet2: 'Jupiter', aspect: 'square', score: 2 },
  { planet1: 'Mars', planet2: 'Jupiter', aspect: 'opposition', score: 2 },

  { planet1: 'Mars', planet2: 'Saturn', aspect: 'conjunction', score: -3 },
  { planet1: 'Mars', planet2: 'Saturn', aspect: 'sextile', score: 1 },
  { planet1: 'Mars', planet2: 'Saturn', aspect: 'trine', score: 1 },
  { planet1: 'Mars', planet2: 'Saturn', aspect: 'square', score: -4 },
  { planet1: 'Mars', planet2: 'Saturn', aspect: 'opposition', score: -4 },

  { planet1: 'Mars', planet2: 'Uranus', aspect: 'conjunction', score: 1 },
  { planet1: 'Mars', planet2: 'Uranus', aspect: 'sextile', score: 1 },
  { planet1: 'Mars', planet2: 'Uranus', aspect: 'trine', score: 1 },
  { planet1: 'Mars', planet2: 'Uranus', aspect: 'square', score: -2 },
  { planet1: 'Mars', planet2: 'Uranus', aspect: 'opposition', score: -2 },

  { planet1: 'Mars', planet2: 'Neptune', aspect: 'conjunction', score: -2 },
  { planet1: 'Mars', planet2: 'Neptune', aspect: 'sextile', score: 1 },
  { planet1: 'Mars', planet2: 'Neptune', aspect: 'trine', score: 1 },
  { planet1: 'Mars', planet2: 'Neptune', aspect: 'square', score: -2 },
  { planet1: 'Mars', planet2: 'Neptune', aspect: 'opposition', score: -2 },

  { planet1: 'Mars', planet2: 'Pluto', aspect: 'conjunction', score: 2 },
  { planet1: 'Mars', planet2: 'Pluto', aspect: 'sextile', score: 2 },
  { planet1: 'Mars', planet2: 'Pluto', aspect: 'trine', score: 2 },
  { planet1: 'Mars', planet2: 'Pluto', aspect: 'square', score: -3 },
  { planet1: 'Mars', planet2: 'Pluto', aspect: 'opposition', score: -3 },
  { planet1: 'Jupiter', planet2: 'Jupiter', aspect: 'conjunction', score: 2 },
  { planet1: 'Jupiter', planet2: 'Jupiter', aspect: 'sextile', score: 2 },
  { planet1: 'Jupiter', planet2: 'Jupiter', aspect: 'trine', score: 2 },
  { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'conjunction', score: -1 },
  { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'sextile', score: 1 },
  { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'trine', score: 1 },
  { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'square', score: -1 },
  { planet1: 'Jupiter', planet2: 'Saturn', aspect: 'opposition', score: -1 },
  { planet1: 'Jupiter', planet2: 'Uranus', aspect: 'conjunction', score: 1 },
  { planet1: 'Jupiter', planet2: 'Uranus', aspect: 'sextile', score: 1 },
  { planet1: 'Jupiter', planet2: 'Uranus', aspect: 'trine', score: 1 },
  { planet1: 'Jupiter', planet2: 'Neptune', aspect: 'conjunction', score: 1 },
  { planet1: 'Jupiter', planet2: 'Neptune', aspect: 'sextile', score: 1 },
  { planet1: 'Jupiter', planet2: 'Neptune', aspect: 'trine', score: 1 },
  { planet1: 'Jupiter', planet2: 'Neptune', aspect: 'square', score: -1 },
  { planet1: 'Jupiter', planet2: 'Neptune', aspect: 'opposition', score: -1 },
  { planet1: 'Jupiter', planet2: 'Pluto', aspect: 'conjunction', score: 1 },
  { planet1: 'Jupiter', planet2: 'Pluto', aspect: 'sextile', score: 1 },
  { planet1: 'Jupiter', planet2: 'Pluto', aspect: 'trine', score: 1 },
  { planet1: 'Jupiter', planet2: 'Pluto', aspect: 'square', score: -1 },
  { planet1: 'Jupiter', planet2: 'Pluto', aspect: 'opposition', score: -1 },
  { planet1: 'Saturn', planet2: 'Saturn', aspect: 'sextile', score: 1 },
  { planet1: 'Saturn', planet2: 'Saturn', aspect: 'trine', score: 1 },
  { planet1: 'Saturn', planet2: 'Saturn', aspect: 'square', score: -1 },
  { planet1: 'Saturn', planet2: 'Saturn', aspect: 'opposition', score: -1 },
];

class SynastryScoreService {
  private calculateAngle(ra1: number, ra2: number): number {
    const diff = Math.abs(ra1 - ra2);
    return diff > 180 ? 360 - diff : diff;
  }

  private getAspectName(angle: number): string | null {
    for (const range of aspectRanges) {
      if (angle >= range.minAngle && angle <= range.maxAngle) {
        return range.name;
      }
    }
    return null;
  }

  private getPlanetaryAspectScore(planet1: string, planet2: string, aspectName: string | null): number {
    if (!aspectName) return 0;

    for (const planetaryAspect of planetaryAspects) {
      if (
        (planetaryAspect.planet1 === planet1 &&
          planetaryAspect.planet2 === planet2 &&
          planetaryAspect.aspect === aspectName) ||
        (planetaryAspect.planet1 === planet2 &&
          planetaryAspect.planet2 === planet1 &&
          planetaryAspect.aspect === aspectName)
      ) {
        return planetaryAspect.score;
      }
    }
    return 0;
  }

  public calculateCompatibility(
    partner1: PlanetaryPositionDTO,
    partner2: PlanetaryPositionDTO,
  ): { totalScore: number; categoryScores: { [key: number]: number } } {
    const partner1Updated = this.mapToCelestialBodies(partner1);
    const partner2Updated = this.mapToCelestialBodies(partner2);

    let totalScore = 0;
    const categoryScores: { [key: number]: number } = {
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      0: 0,
      '-1': 0,
      '-2': 0,
      '-3': 0,
      '-4': 0,
    };

    for (const body1 of partner1Updated) {
      for (const body2 of partner2Updated) {
        const angle = this.calculateAngle(body1.ra, body2.ra);
        const aspectName = this.getAspectName(angle);
        const score = this.getPlanetaryAspectScore(body1.name, body2.name, aspectName);
        totalScore += score;

        if (categoryScores[score] !== undefined) {
          categoryScores[score] += 1;
        }
      }
    }

    return { totalScore, categoryScores };
  }

  private mapToCelestialBodies(dto: PlanetaryPositionDTO): CelestialBody[] {
    const celestialBodies: CelestialBody[] = [];

    const planetaryMappings: { [key: string]: string } = {
      Sun: dto.sunPosition,
      Moon: dto.moonPosition,
      Mercury: dto.mercury,
      Venus: dto.venus,
      Mars: dto.mars,
      Jupiter: dto.jupiter,
      Saturn: dto.saturn,
      Uranus: dto.uranus,
      Neptune: dto.neptune,
      Pluto: dto.pluto,
    };

    for (const [name, position] of Object.entries(planetaryMappings)) {
      if (position) {
        const ra = parseFloat(position.split(',')[0]);
        celestialBodies.push({ name, ra });
      }
    }

    return celestialBodies;
  }
}

export { SynastryScoreService };
