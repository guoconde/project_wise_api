import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists.error';
import { CreateUserUseCase } from '@/domain/use-cases/user/create-user.use-case';
import { FakeHasher } from 'test/criptography/fake-hasher';
import { makeUser } from 'test/factories/make-user';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher);
  });

  it('should be able to create an user', async () => {
    const user = makeUser({
      admin: true,
      email: 'johndoe@example.com',
      name: 'John Doe',
    });

    const result = await sut.execute(user);

    expect(result).not.toBeNull();
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(result).toEqual({
      user: expect.objectContaining({
        admin: true,
        email: 'johndoe@example.com',
        name: 'John Doe',
      }) as unknown,
    });
  });

  it('should hash user password upon registration', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: '123123',
    });

    const hashedPassword = await fakeHasher.hash('123123');

    const result = await sut.execute(user);

    const findUserByEmail = await inMemoryUsersRepository.findByEmail(user.email);

    expect(result.user).not.toBeNull();
    expect(findUserByEmail?.password).toEqual(hashedPassword);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });

  it('not should be able to create an user user already exists on company', async () => {
    const user = makeUser({
      admin: true,
      email: 'johndoe@example.com',
      name: 'John Doe',
      companyId: '1',
    });

    await sut.execute(user);

    try {
      await sut.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExistsError);
      if (error instanceof UserAlreadyExistsError) {
        expect(error.message).toEqual('Usuário já cadastrado nessa empresa');
      }
    }
  });
});
