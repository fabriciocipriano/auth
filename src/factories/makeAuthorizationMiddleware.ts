import { AuthorizationMiddleware } from '../app/middlewares/AuthorizationMiddleware';
import { makeGetRolePermissionsUseCase } from './makeGetRolePermissionsUseCase';

export function makeAuthorizationMiddlewares(
  allowedRoles: string[],
) {
  return new AuthorizationMiddleware(
    allowedRoles,
    makeGetRolePermissionsUseCase(),
  );
}
