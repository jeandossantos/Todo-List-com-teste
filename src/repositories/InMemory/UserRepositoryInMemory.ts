import { User } from '../../entities/User';
import { IUserRepository } from '../userRepository/IUserRepository';
import crypto from 'crypto';

export class UserRepositoryInMemory implements IUserRepository {
  public items: User[] = [];

  clearItems() {
    this.items = [];
  }

  async create(user: User) {
    user.id = crypto.randomUUID();
    this.items.push(user);

    return user;
  }

  async exists(email: string) {
    const user = this.items.find((user) => user.email === email);

    return !!user;
  }
  async findById(userId: string) {
    const user = this.items.find((user) => user.id === userId);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    return user;
  }

  async remove(userId: string) {
    const user = this.items.find((user) => user.id === userId);
    this.items = this.items.filter((user) => user.id !== userId);

    return user;
  }

  async update(userId: string, name: string, initials: string) {
    this.items = this.items.map((user) => {
      if (user.id === userId) {
        user.name = name;
        user.initials = initials;
      }

      return user;
    });
  }
}
