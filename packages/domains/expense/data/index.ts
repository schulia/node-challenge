import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Expense } from '../types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

export async function findById(expenseId): Promise<Expense> {
  console.log('data', expenseId)
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
