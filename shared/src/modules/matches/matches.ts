import { UserDTO } from '../users/types';

export type MatchDTO = {
  id: number; // Unique identifier for the match
  userId1: number; // ID of the first user
  userId2: number; // ID of the second user
  synastryScore: number; // Synastry score between the two users
  createdAt: Date; // Timestamp when the match was created
  updatedAt: Date; // Timestamp when the match was last updated
  isAccepted: boolean; // Flag for match acceptance
  isDeleted: boolean; // Flag for logical deletion
  user1: UserDTO;
  user2: UserDTO;
};

export type MatchCreateRequestDTO = {
  userId1: number; // ID of the first user
  userId2: number; // ID of the second user
  synastryScore?: number; // Synastry score between the two users
  isAccepted?: boolean; // Flag for match acceptance
  isDeleted?: boolean; // Flag for logical deletion
};
