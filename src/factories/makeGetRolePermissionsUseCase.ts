import { GetRolePermissionsUseCase } from '../app/useCases/GetRolePermissionsUseCase';

export function makeGetRolePermissionsUseCase() {
  return new GetRolePermissionsUseCase();
}
