import { container } from 'tsyringe';
import { CreateUserUseCase } from '../../use-cases';

container.registerSingleton<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase);
