import prisma from '~/libs/prisma/prisma-client';
import { MessageRepository } from './message.repository';

export class MessageService {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository(prisma);
  }

  async getAllBySenderAndRecipient(senderId: number, recipientId: number) {
    return this.messageRepository.getAllBetweenUsers(senderId, recipientId);
  }

  async create({ senderId, recipientId, content }: { senderId: number; recipientId: number; content: string }) {
    return this.messageRepository.create({ senderId, recipientId, content });
  }
}
