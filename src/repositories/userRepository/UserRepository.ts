import { prisma } from '../../connection';

import { User } from '../../entities/User';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  findByEmail: (email: string) => Promise<User>;

  async exists(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  findById: (userId: string) => Promise<User>;

  async create({ name, initials, email, password }: User): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        initials,
        email,
        password,
      },
    });
  }
}
