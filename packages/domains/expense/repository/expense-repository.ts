import express from 'express';
import { Expense } from '../types';
import { PrismaClient } from '@prisma/client';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

export async function findById(expenseId): Promise<Expense> {
  if (!expenseId) {
    throw BadRequest('expenseId property is missing.');
  }

  const rawExpense = await prisma.expenses.findUnique({
    where: { id: expenseId },
  });

  if (!rawExpense) {
    throw NotFound(`Could not find expense with id ${expenseId}`);
  }

  if (rawExpense.error) {
    throw InternalError(rawExpense.error);
  }

  return rawExpense;
}

export async function findByConditions(conditions, pageOptions) {
  const { merchant_name, status, currency } = conditions;
  const { skip, take } = pageOptions;

  const rawExpenses = await prisma.expenses.findMany({
    skip,
    take,
    where: {
      merchant_name,
      status,
      currency,
    },
    orderBy: {
      date_created: 'desc',
    },
  });

  if (rawExpenses.length === 0) {
    throw NotFound('Could not find expenses with given conditions');
  }

  if (rawExpenses.error) {
    throw InternalError(rawExpenses.error);
  }

  return rawExpenses;
}
