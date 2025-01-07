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
  moonSign?: string;
  goals: number[];
  interests: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PreferenceCreateRequestDTO {
  userId: number;
  minAge?: number | null;
  maxAge?: number | null;
  currentCity?: string | null;
  currentCountry?: string | null;
  gender?: Gender | null;
  sunSign?: string | null;
  moonSign?: string | null;
  goals?: number[];
  interests?: number[];
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

import { z } from 'zod';

export const PreferenceCreateRequestSchema = z.object({
  userId: z.number(),
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  currentCity: z.string().optional(),
  currentCountry: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  sunSign: z.string().optional(),
  moonSign: z.string().optional(),
  goals: z.array(z.number()),
  interests: z.array(z.number()),
});
