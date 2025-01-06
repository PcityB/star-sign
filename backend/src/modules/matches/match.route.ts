import express from 'express';
import { MatchController } from './match.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = express.Router();

const matchController = new MatchController();

router.post('/', authMiddleware, matchController.create);
router.patch('/:id', authMiddleware, matchController.accept);
router.get('/', authMiddleware, matchController.getByUserId);
router.delete('/:id', authMiddleware, matchController.delete);

export default router;
