import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { EXP_TIME } from '../config/constants';
import { env } from '../config/env';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { prisma } from '../lib/prisma';
import RefreshTokenRepository from '../repositories/RefreshTokenRepository';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
  refreshToken: string;
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
      {
        sub: account.id,
        role: account.roleId,
      },
      env.jwtSecret,
      { expiresIn: '10s' },
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME);

    const { id: refreshToken } =
      await RefreshTokenRepository.create(
        account.id,
        expiresAt,
      );

    return {
      accessToken,
      refreshToken,
    };
  }
}
