import { RefreshToken } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';

interface IRefreshTokenWithRole {
  id: string;
  accountId: string;
  issuedAt: Date;
  expiresAt: Date;
  roleId: string;
}

class RefreshTokenRepository {
  create(
    accountId: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        accountId,
        expiresAt,
      },
    });
  }

  async findById(
    id: string,
  ): Promise<IRefreshTokenWithRole | null> {
    const token = await prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });

    if (!token) return null;

    const account = await prisma.account.findUnique({
      where: { id: token.accountId },
      select: { roleId: true },
    });

    if (!account) return null;

    return {
      ...token,
      roleId: account.roleId,
    };
  }

  deleteById(id: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  }
}

export default new RefreshTokenRepository();
