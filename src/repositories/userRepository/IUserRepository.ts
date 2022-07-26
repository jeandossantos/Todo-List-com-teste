import { User } from '../../entities/User';

export interface IUserRepository {
  create: (user: User) => Promise<User>;
  findById: (userId: string) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  exists: (email: string) => Promise<boolean>;
  remove: (userId: string) => Promise<User>;
  update: (userId: string, name: string, initials: string) => Promise<void>;
}
