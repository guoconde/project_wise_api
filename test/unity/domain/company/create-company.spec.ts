import { InvalidDocumentError } from '@/domain/errors';
import { CreateCompanyUseCase } from '@/domain/use-cases';
import { DocumentValidator } from '@/infra/validator';
import { FakeHasher } from 'test/criptography/fake-hasher';
import { makeCompany } from 'test/factories/make-company';
import { InMemoryCompaniesRepository } from 'test/repositories/in-memory-companies.repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCompaniesRepository: InMemoryCompaniesRepository;
let fakeHasher: FakeHasher;
let documentValidator: DocumentValidator;
let sut: CreateCompanyUseCase;

describe('Create company', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCompaniesRepository = new InMemoryCompaniesRepository(inMemoryUsersRepository);
    fakeHasher = new FakeHasher();
    documentValidator = new DocumentValidator();
    sut = new CreateCompanyUseCase(inMemoryCompaniesRepository, fakeHasher, documentValidator);
  });

  it('should be able to create a company', async () => {
    const company = makeCompany({
      name: 'John Doe Enterprise',
      document: '31018749047',
    });

    const result = await sut.execute(company);

    expect(result).not.toBeNull();
    expect(result).toEqual({
      company: expect.objectContaining({
        name: 'John Doe Enterprise',
      }) as unknown,
    });
    expect(result.company.id).toEqual(inMemoryUsersRepository.items[0].companyId);
    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        isResponsible: true,
        admin: true,
      }),
    );
  });

  it('should not be able to create a company with invalid CPF', async () => {
    const company = makeCompany({
      document: '35853200071',
    });

    try {
      const result = await sut.execute(company);

      expect(result).toThrowError();
    } catch (error) {
      expect(company.document).toHaveLength(11);
      expect(error).toBeInstanceOf(InvalidDocumentError);
      if (error instanceof InvalidDocumentError) {
        expect(error.message).toEqual('O número de documento é inválido');
      }
    }
  });

  it('should not be able to create a company with invalid CNPJ', async () => {
    const company = makeCompany({
      document: '15728330000173',
    });

    try {
      const result = await sut.execute(company);

      expect(result).toThrowError();
    } catch (error) {
      expect(company.document).toHaveLength(14);
      expect(error).toBeInstanceOf(InvalidDocumentError);
      if (error instanceof InvalidDocumentError) {
        expect(error.message).toEqual('O número de documento é inválido');
      }
    }
  });
});
