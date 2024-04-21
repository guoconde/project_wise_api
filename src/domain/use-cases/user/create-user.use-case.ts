import { HashGenarator } from '@/domain/cryptography';
import { CreateUserInput, User } from '@/domain/enterprise';
import { UserAlreadyExistsError } from '@/domain/errors';
import { UsersRepository } from '@/domain/repositories';
import { inject, injectable } from 'tsyringe';

interface CreateUserOutput {
  user: User;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @inject('HashGenerator')
    private readonly hashGenarator: HashGenarator,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { email, companyId, password } = input;
    const userAlreadyExistOnThisCompany = await this.usersRepository.findByEmailAndCompanyId({
      email,
      companyId,
    });

    if (userAlreadyExistOnThisCompany) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hashGenarator.hash(password);

    const user = await this.usersRepository.create({
      ...input,
      password: hashedPassword,
    });

    return {
      user,
    };
  }
}
