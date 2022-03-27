import { Router } from 'express';
import { router as expense } from './routes/expense-routes';

export const router = Router();

router.use('/v1', expense);
