import { Router } from 'express';
import { MessageController } from './message.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = Router();

const messageController = new MessageController();

router.get('/', authMiddleware, messageController.getAllBySenderAndRecipient);

export default router;
