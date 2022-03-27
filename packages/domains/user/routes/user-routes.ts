import { ApiError } from '@nc/utils/errors';
import { findById } from '../data/index';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/user/:userId', async (req, res, next) => {
  const [userError, userDetails] = await to(findById(req.params.userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(secureTrim(userDetails));
});
