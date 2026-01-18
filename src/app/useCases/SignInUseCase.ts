import { hash } from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignInUseCase {
  async execute({
    email,
    name,
    password,
  }: IInput): Promise<IOutput> {
    const accountAlredyExists =
      await prisma.account.findUnique({
        where: {
          email,
        },
      });

    if (accountAlredyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 12);

    await prisma.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
