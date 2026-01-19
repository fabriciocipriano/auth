import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { prisma } from '../lib/prisma';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({
    email,
    password,
  }: IInput): Promise<IOutput> {
    const account = await prisma.account.findUnique({
      where: {
        email,
      },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(
      password,
      account.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = jwt.sign(
      { sub: account.id },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return {
      accessToken,
    };
  }
}
