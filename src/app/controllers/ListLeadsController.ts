import {
  IController,
  IResponse,
} from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';

export class ListLeadsController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        leads: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
          },
          {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
          },
          {
            id: 3,
            name: 'Bob Smith',
            email: 'bob@example.com',
          },
        ],
      },
    };
  }
}
