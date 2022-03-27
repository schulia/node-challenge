import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Expense } from '../types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

export async function findById(expenseId): Promise<Expense> {
  if (!expenseId) {
    throw BadRequest('userId property is missing.');
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

export async function findByConditions(conditions) {
  const merchant = conditions.merchant
  const status = conditions.status
  const currency = conditions.currency

  if (!merchant && !status && !currency) {
    throw BadRequest('condition property is missing.');
  }

  const rawExpenses = await prisma.expenses.findMany({
    where: {
      merchant_name: merchant,
      status: status,
      currency: currency
    },
  });

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses with conditions ${conditions}`);
  }

  if (rawExpenses.error) {
    throw InternalError(rawExpenses.error);
  }

  return rawExpenses;
}

export async function findByDateInterval(dates) {
  const dateBegin = dates.dateBegin;
  const dateEnd = dates.dateEnv;

  if (!dates) {
    throw BadRequest('condition property is missing.');
  }

  const rawExpenses = await prisma.expenses.findMany({
    where: { 
      merchant_name: merchant,
      status: status,
      currency: currency
    },
  });

  if (!rawExpenses) {
    throw NotFound(`Could not find expense with id ${expenseId}`);
  }

  if (rawExpenses.error) {
    throw InternalError(rawExpenses.error);
  }

  return rawExpenses;
}
