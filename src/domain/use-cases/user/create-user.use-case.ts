import { HashGenarator } from '@/domain/cryptography/hash-generator';
import { CreateUserInput, User } from '@/domain/enterprise/user';
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists.error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { inject, injectable } from 'tsyringe';

interface CreateUserOutput {
  user: User;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    @inject('HashGenerator')
    private readonly hashGenarator: HashGenarator,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { email, companyId, password } = input;
    const userAlreadyExistOnThisCompany = await this.userRepository.findByEmailAndCompanyId({
      email,
      companyId,
    });

    if (userAlreadyExistOnThisCompany) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hashGenarator.hash(password);

    const user = await this.userRepository.create({
      ...input,
      password: hashedPassword,
    });

    return {
      user,
    };
  }
}
