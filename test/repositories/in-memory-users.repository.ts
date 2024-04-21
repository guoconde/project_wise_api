import { CreateUserInput, User } from '@/domain/enterprise';
import { UsersRepository } from '@/domain/repositories';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: CreateUserInput): Promise<User> {
    const setUser = {
      ...user,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      costPerHour: 0,
    };

    this.items.push(setUser);

    return setUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmailAndCompanyId({
    email,
    companyId,
  }: {
    email: string;
    companyId: string;
  }): Promise<User | null> {
    const user = this.items.find(item => item.email === email && item.companyId === companyId);

    if (!user) {
      return null;
    }

    return user;
  }
}
