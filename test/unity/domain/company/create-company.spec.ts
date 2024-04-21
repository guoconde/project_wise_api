import { CreateCompanyUseCase } from '@/domain/use-cases';
import { FakeHasher } from 'test/criptography/fake-hasher';
import { makeCompany } from 'test/factories/make-company';
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCompaniesRepository: InMemoryCompaniesRepository;
let fakeHasher: FakeHasher;
let sut: CreateCompanyUseCase;

describe('Create company', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository(inMemoryUsersRepository);
    fakeHasher = new FakeHasher();
    sut = new CreateCompanyUseCase(inMemoryCompaniesRepository, fakeHasher);
  });

  it('should bt able to create an company', async () => {
    const company = makeCompany({
      name: 'John Doe Enterprise',
    });

    const result = await sut.execute(company);

    expect(result).not.toBeNull();
    expect(result).toEqual({
      company: expect.objectContaining({
        name: 'John Doe Enterprise',
      }) as unknown,
    });
    expect(result.company.id).toEqual(inMemoryUsersRepository.items[0].companyId);
  });
});

//! tem que fazer um verificador de cnpj
