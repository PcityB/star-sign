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
  goals: number[];
  interests: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePreferenceDTO {
  userId: number;
  minAge?: number;
  maxAge?: number;
  currentCity?: string;
  currentCountry?: string;
  gender?: Gender;
  sunSign?: string;
  goals: number[];
  interests: number[];
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
