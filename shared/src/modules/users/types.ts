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
};

export type AuthResponseDTO = {
  token: string;
  user: UserDTO;
};
