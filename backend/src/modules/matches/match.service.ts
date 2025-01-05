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

class MatchService {
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

  public calculateCompatibility(partner1: CelestialBody[], partner2: CelestialBody[]): number {
    let totalScore = 0;

    for (const body1 of partner1) {
      for (const body2 of partner2) {
        const angle = this.calculateAngle(body1.ra, body2.ra);
        const aspectName = this.getAspectName(angle);
        const score = this.getPlanetaryAspectScore(body1.name, body2.name, aspectName);
        totalScore += score;
      }
    }

    return totalScore;
  }
}

export { MatchService };
