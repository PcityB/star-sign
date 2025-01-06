import express from 'express';
import { PreferenceController } from './preference.controller';
import authMiddleware from '~/libs/middleware/auth.middleware';

const router = express.Router();

const preferenceController = new PreferenceController();

router.patch('/', authMiddleware, preferenceController.update);

export default router;
