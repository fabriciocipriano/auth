import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import {
  IData,
  IMidleware,
  IResponse,
} from '../interfaces/IMidleware';
import { IRequest } from '../interfaces/IRequest';

export class AuthenticationMiddlewares implements IMidleware {
  async handle({
    headers,
  }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      await Promise.resolve({
        statusCode: 401,
        body: null,
      });
    }

    try {
      const [bearer, token] =
        authorization?.split(' ') ?? [];

      if (bearer !== 'Bearer') {
        throw new Error();
      }

      const payload = jwt.verify(
        token ?? '',
        env.jwtSecret,
      ) as JwtPayload;

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: null,
      };
    }
  }
}
