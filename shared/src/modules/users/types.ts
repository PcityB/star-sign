export type UserDTO = {
  id: number;
  name: string;
  email: string;
  password: string;
  gender?: string;
  birthTimestamp?: Date;
  birthLongitude?: string;
  birthLatitude?: string;
  birthCity?: string;
  birthCountry?: string;
  currentCity?: string;
  currentCountry?: string;
  photos?: string[];
  description?: string;
  minAge?: number;
  maxAge?: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  PlanetaryPosition?: PlanetaryPositionDTO;
};

export type SignInRequestDTO = {
  email: string;
  password: string;
};

export type SignUpRequestDTO = {
  name: string;
  email: string;
  password: string;
};

export type UserPatchRequestDTO = {
  name?: string;
  gender?: string;
  birthTimestamp?: Date;
  birthLongitude?: string;
  birthLatitude?: string;
  birthCity?: string;
  birthCountry?: string;
  currentCity?: string;
  currentCountry?: string;
  photos?: File[] | string[];
  description?: string;
  minAge?: number;
  maxAge?: number;
  isDeleted?: boolean;
};

export type AuthResponseDTO = {
  token: string;
  user: UserDTO;
};

export type PlanetaryPositionDTO = {
  id: number;
  userId: number;
  sunSign: string;
  moonSign: string;
  ascendant: string;
  sunPosition: string;
  moonPosition: string;
  mercury: string;
  venus: string;
  mars: string;
  jupiter: string;
  saturn: string;
  uranus: string;
  neptune: string;
  pluto: string;
  createdAt: Date;
  updatedAt: Date;
};
