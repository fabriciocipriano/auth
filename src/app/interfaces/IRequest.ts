import { ParamsDictionary } from 'express-serve-static-core';

export interface IRequest {
  body: Record<string, any>;
  params: ParamsDictionary;
  headers: Record<string, string>;
  account?: {
    id: string;
    role: string;
  };
}
