import { Router } from 'express';
import { MessageController } from './message.controller';

const router = Router();

const messageController = new MessageController();

router.get('/', messageController.getAllBySenderAndRecipient);

export default router;
