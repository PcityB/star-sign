export type UserDTO = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  gender?: string;
  birthTimestamp?: Date;
  longitude?: number;
  latitude?: number;
  locationOfBirth?: string;
  currentLocation?: string;
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
  email?: string;
  password?: string;
  gender?: string;
  birthTimestamp?: Date;
  longitude?: number;
  latitude?: number;
  locationOfBirth?: string;
  currentLocation?: string;
  photos?: File[] | string[];
  description?: string;
  minAge?: number;
  maxAge?: number;
};

export type AuthResponseDTO = {
  token: string;
  user: UserDTO;
};
