import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getExpenseById, getExpenseFiltered } from '../services/expense-service';

export const router = Router();

router.get('/expense/:expenseId', async (req, res, next) => {
  const [expenseError, expenseDetails] = await to(getExpenseById(req.params.expenseId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get expense details: ${expenseError.message}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({});
  }

  return res.json(expenseDetails);
});

router.get('/expenses', async (req, res, next) => {
  const [expenseError, expensesDetails] = await to(getExpenseFiltered(req.query));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get expense details: ${expenseError.message}`, expenseError.title, req));
  }

  return res.json(expensesDetails);
});
