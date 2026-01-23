// oxlint-disable max-lines-per-function
import jwt from 'jsonwebtoken';
import z from 'zod';
import { EXP_TIME } from '../config/constants';
import { env } from '../config/env';
import {
  IController,
  IResponse,
} from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import RefreshTokenRepository from '../repositories/RefreshTokenRepository';

const schema = z.object({
  refreshToken: z.uuid(),
});

function getAccessToken(id: string, roleId: string) {
  return jwt.sign(
    {
      sub: id,
      role: roleId,
    },
    env.jwtSecret,
    { expiresIn: '10s' },
  );
}

export class RefreshTokenController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        statusCode: 400,
        body: result.error.issues,
      };
    }

    const { refreshToken: refreshTokenId } = result.data;

    const refreshToken =
      await RefreshTokenRepository.findById(refreshTokenId);

    if (!refreshToken) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid refresh token',
        },
      };
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
      await RefreshTokenRepository.deleteById(
        refreshToken.id,
      );

      return {
        statusCode: 401,
        body: {
          error: 'Expired refresh token',
        },
      };
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME);

    const [accessToken, newRefreshToken] =
      await Promise.all([
        getAccessToken(
          refreshToken.accountId,
          refreshToken.roleId,
        ),
        RefreshTokenRepository.create(
          refreshToken.accountId,
          expiresAt,
        ),
        RefreshTokenRepository.deleteById(refreshToken.id),
      ]);

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken: newRefreshToken.id,
      },
    };
  }
}
