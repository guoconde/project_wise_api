export interface UserRepository {
  create(email: string, password: string): Promise<string>;
  findByEmail(email: string): Promise<string | null>;
}
