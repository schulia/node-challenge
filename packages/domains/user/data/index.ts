import express from 'express';
import { PrismaClient } from '@prisma/client';
import { User } from '../types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

export async function findById(userId): Promise<User> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const rawUser = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  if (rawUser.error) {
    throw InternalError(rawUser.error);
  }

  return rawUser;
}
