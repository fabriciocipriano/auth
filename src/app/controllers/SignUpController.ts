import z from 'zod';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import {
  IController,
  IResponse,
} from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignUpUseCase } from '../useCases/SignUpUseCase';

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  roleId: z.uuid(),
});

export class SignUpController implements IController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password, roleId } =
        schema.parse(body);

      await this.signUpUseCase.execute({
        name,
        email,
        password,
        roleId,
      });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'Account already exists',
          },
        };
      }

      throw error;
    }
  }
}
