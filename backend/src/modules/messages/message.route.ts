import { Router } from 'express';
import { MessageController } from './message.controller';

const router = Router();

const messageController = new MessageController();

router.post('/', messageController.create);

export default router;
