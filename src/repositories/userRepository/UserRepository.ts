import { prisma } from '../../connection';

import { User } from '../../entities/User';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async remove(userId: string) {
    const user = prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async update(userId: string, name: string, initials: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        initials,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async exists(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async create({ name, initials, email, password }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        initials,
        email,
        password,
      },
    });

    return user;
  }
}
