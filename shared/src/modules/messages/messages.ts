import { UserDTO } from '../users/types';
import z from 'zod';

export type MessageDTO = {
  id?: number; // Optional for newly sent messages (before saving in the database)
  senderId: number; // ID of the user sending the message
  recipientId: number; // ID of the user receiving the message
  content: string; // The text content of the message
  createdAt?: Date; // Optional for new messages, ISO format timestamp
  sender?: UserDTO;
  recipient?: UserDTO;
};

export const MessageCreateRequestSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Message content is required.' })
    .max(1000, { message: 'Message must be at most 1000 characters.' }),

  senderId: z.number(),
  recipientId: z.number(),
});
