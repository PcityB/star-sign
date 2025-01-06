import { Router } from 'express';
import { AttributeController } from './attribute.controller';

const router = Router();

const attributeController = new AttributeController();

router.get('/goals', attributeController.getAllGoals);
router.get('/interests', attributeController.getAllInterests);

export default router;
