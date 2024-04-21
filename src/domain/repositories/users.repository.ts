import { CreateUserInput, User } from '../enterprise/user';

export interface UsersRepository {
  create(user: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndCompanyId({
    email,
    companyId,
  }: {
    email: string;
    companyId: string;
  }): Promise<User | null>;
}
