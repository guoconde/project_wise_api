import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from '../use-cases/auth/authenticate-user.use-case';

container.registerSingleton<AuthenticateUserUseCase>(
  'AuthenticateUserUseCase',
  AuthenticateUserUseCase,
);
