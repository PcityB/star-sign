import { UserDTO } from "../users/types";

export type MessageDTO = {
  id?: number; // Optional for newly sent messages (before saving in the database)
  senderId: number; // ID of the user sending the message
  recipientId: number; // ID of the user receiving the message
  content: string; // The text content of the message
  createdAt?: Date; // Optional for new messages, ISO format timestamp
  sender?: UserDTO;
  recipient?: UserDTO
};
