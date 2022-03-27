import { router as expense } from './controllers/expense-routes';
import { Router } from 'express';

export const router = Router();

router.use('/v1', expense);
