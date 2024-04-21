import { Encrypter } from '@/domain/cryptography/encrypter';
import { HashComparer } from '@/domain/cryptography/hash-comparer';
import { UserRepository } from '@/domain/repositories/user.repository';
import { inject, injectable } from 'tsyringe';

interface AuthenticateUserInput {
  email: string;
  password: string;
}

interface AuthenticateUserOutput {
  accessToken: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    @inject('HashComparer')
    private readonly hashComparer: HashComparer,
    @inject('Encripter')
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ email, password }: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error();
    }

    const isPasswordValid = await this.hashComparer.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error();
    }

    const accessToken = await this.encrypter.encrypt({ sub: user.id.toString() });

    return {
      accessToken,
    };
  }
}
