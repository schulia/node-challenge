import { to } from '@nc/utils/async';
import { findByConditions, findById } from '../repository/expense-repository';
import { BadRequest } from '@nc/utils/errors';

export async function getExpenseById(expenseId) {
  const [expenseError, expenseDetails] = await to(findById(expenseId));

  if (expenseError) {
    return expenseError;
  }

  if (!expenseDetails) {
    return;
  }

  return expenseDetails;
}

export async function getExpenseFiltered(filters) {
  const pageOptions = { skip: 0, take: Number(filters.items) || 10 };

  if (filters.page && filters.items) {
    if (Number(filters.page) < 1) {
      throw BadRequest(`Page numbers start at 1, ${filters.page} given`);
    }
    pageOptions.skip = (Number(filters.page) - 1) * Number(filters.items);
  }

  const [expenseError, expenses] = await to(findByConditions(filters, pageOptions));

  if (expenseError) {
    return expenseError;
  }

  return expenses;
}
