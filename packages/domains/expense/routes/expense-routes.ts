import { ApiError } from '@nc/utils/errors';
import { findById } from '../data/index';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/expense/:expenseId', async (req, res, next) => {
  console.log(req.params.expenseId);
  const [expenseError, expenseDetails] = await to(findById(req.params.expenseId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get expense details: ${expenseError}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({});
  }

  return res.json(expenseDetails);
});
