import { Router } from 'express';
import { router as expense } from './controllers/expense-routes';

export const router = Router();

router.use('/v1', expense);
