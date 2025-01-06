export type UserDTO = {
  id: number;
  name: string;
  email: string;
  password: string;
  gender?: string | null;
  birthTimestamp?: Date | null;
  birthLongitude?: string | null;
  birthLatitude?: string | null;
  birthCity?: string | null;
  birthCountry?: string | null;
  photos?: string[];
  description?: string | null;
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
  photos?: File[] | string[];
  description?: string;
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
