import { HashGenarator } from '@/domain/cryptography';
import { Company, CreateCompanyInput } from '@/domain/enterprise';
import { CompanyAlreadyExistsError, InvalidDocumentError } from '@/domain/errors';
import { CompaniesRepository } from '@/domain/repositories';
import { DocumentValidator } from '@/infra/validator';
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
    @inject('DocumentValidator')
    private readonly documentValidator: DocumentValidator,
  ) {}

  async execute(input: CreateCompanyInput): Promise<CreateCompanyOutput> {
    const { document, user } = input;

    const isValid = this.documentValidator.validate(document);

    if (!isValid) {
      throw new InvalidDocumentError();
    }

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
