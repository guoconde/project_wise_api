import { HashGenarator } from '@/domain/cryptography';
import { Company, CreateCompanyInput } from '@/domain/enterprise';
import { CompanyAlreadyExistsError } from '@/domain/errors';
import { CompaniesRepository } from '@/domain/repositories';
import { inject, injectable } from 'tsyringe';

interface CreateCompanyOutput {
  company: Company;
}

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRespository')
    private readonly companiesRepository: CompaniesRepository,
    @inject('HashGenarator')
    private readonly hashGenarator: HashGenarator,
  ) {}

  async execute(input: CreateCompanyInput): Promise<CreateCompanyOutput> {
    const { document, user } = input;

    const companyDocumentAlreadyRegistered =
      await this.companiesRepository.findByDocument(document);

    if (companyDocumentAlreadyRegistered) {
      throw new CompanyAlreadyExistsError();
    }

    const hashedPassword = await this.hashGenarator.hash(user.password);

    const company = await this.companiesRepository.create({
      ...input,
      user: {
        ...user,
        password: hashedPassword,
      },
    });

    return {
      company,
    };
  }
}
