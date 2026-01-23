import { IRequest } from './IRequest';

export interface IResponse {
  statusCode: 200 | number;
  body: Record<string, any> | null;
}

export interface IData {
  data: Record<string, any>;
}

export interface IMidleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
