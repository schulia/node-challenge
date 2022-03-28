import { router as expense } from './routes/expense-routes';
import { Router } from 'express';

export const router = Router();

router.use('/v1', expense);
