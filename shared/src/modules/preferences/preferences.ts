export interface InterestDTO {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalDTO {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PreferenceDTO {
  id: number;
  userId: number;
  minAge?: number;
  maxAge?: number;
  currentCity?: string;
  currentCountry?: string;
  gender?: Gender;
  sunSign?: string;
  goalsIds: number[];
  interestsIds: number[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
