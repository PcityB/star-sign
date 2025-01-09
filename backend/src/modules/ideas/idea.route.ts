import { Router } from 'express';
import { IdeaController } from './idea.controller';

const router = Router();

const ideaController = new IdeaController();

router.get('/ideas', ideaController.get);

export default router;
