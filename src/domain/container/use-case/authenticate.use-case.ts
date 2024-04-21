import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from '../../use-cases';

container.registerSingleton<AuthenticateUserUseCase>(
  'AuthenticateUserUseCase',
  AuthenticateUserUseCase,
);
