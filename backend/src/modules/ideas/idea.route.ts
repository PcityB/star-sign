import { Router } from 'express';
import { IdeaController } from './idea.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = Router();

const ideaController = new IdeaController();

router.get('/', authMiddleware, ideaController.get);

export default router;
