import {
  IData,
  IMidleware,
  IResponse,
} from '../interfaces/IMidleware';
import { IRequest } from '../interfaces/IRequest';
import { GetRolePermissionsUseCase } from '../useCases/GetRolePermissionsUseCase';

export class AuthorizationMiddleware implements IMidleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly GetRolePermissionsUseCase: GetRolePermissionsUseCase,
  ) {}

  async handle({
    account,
  }: IRequest): Promise<IResponse | IData> {
    if (!account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access denied',
        },
      };
    }

    const { permissionsCodes } =
      await this.GetRolePermissionsUseCase.execute({
        roleId: account.role,
      });

    const isAllowed = permissionsCodes.some(code =>
      this.requiredPermissions.includes(code),
    );

    if (!isAllowed) {
      return {
        statusCode: 403,
        body: {
          error: 'Access denied',
        },
      };
    }

    return {
      data: {},
    };
  }
}
