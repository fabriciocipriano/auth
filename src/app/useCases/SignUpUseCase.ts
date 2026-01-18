import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prisma } from '../lib/prisma';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

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

    const hashedPassword = await hash(password, this.salt);

    await prisma.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
