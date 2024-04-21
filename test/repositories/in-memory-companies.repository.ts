import { CreateCompanyInput, Company } from '@/domain/enterprise';
import { CompaniesRepository } from '@/domain/repositories';
import { randomUUID } from 'node:crypto';
import { InMemoryUsersRepository } from './in-memory-users.repository';

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = [];

  constructor(private readonly inMemoryUsersRepository: InMemoryUsersRepository) {}

  async create(company: CreateCompanyInput): Promise<Company> {
    const { user } = company;

    const setCompany: Company = {
      ...company,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.inMemoryUsersRepository.create({
      ...user,
      companyId: setCompany.id,
    });

    this.items.push(setCompany);

    return setCompany;
  }

  async findByDocument(document: string): Promise<Company | null> {
    const company = this.items.find(item => item.document === document);

    if (!company) {
      return null;
    }

    return company;
  }
}
