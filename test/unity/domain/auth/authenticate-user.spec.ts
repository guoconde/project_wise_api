import { AuthenticateUserUseCase } from '@/domain/use-cases/auth/authenticate-user.use-case';
import { FakeEncrypter } from 'test/criptography/fake-encrypter';
import { FakeHasher } from 'test/criptography/fake-hasher';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository, fakeHasher, fakeEncrypter);
  });

  it('should authenticate user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123123'),
    });

    inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(result.accessToken).not.toBeNull();
    expect(result).toEqual({
      accessToken: expect.any(String) as string,
    });
  });
});
