import { prisma } from '../lib/prisma';

interface IInput {
  roleId: string;
}

interface IOutput {
  permissionsCodes: string[];
}

export class GetRolePermissionsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions =
      await prisma.rolePermission.findMany({
        where: { roleId },
        select: { permissionCode: true },
      });

    const permissionsCodes = rolePermissions.map(
      rp => rp.permissionCode,
    );

    return { permissionsCodes };
  }
}
