import { Router } from 'express';
import { router as user } from './routes/user-routes';

export const router = Router();

router.use('/v1', user);
