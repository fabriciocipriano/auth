import { NextFunction, Request, Response } from 'express';
import { IMidleware } from '../../app/interfaces/IMidleware';

export function midlewareAdapter(midleware: IMidleware) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const result = await midleware.handle({
      body: request.body,
      params: request.params,
      headers: request.headers as Record<string, string>,
      account: request.metadata?.account,
    });

    if ('statusCode' in result) {
      return response
        .status(result.statusCode)
        .json(result.body);
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();
  };
}
