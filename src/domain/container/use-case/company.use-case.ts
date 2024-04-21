import { container } from 'tsyringe';
import { CreateCompanyUseCase } from '../../use-cases';

container.registerSingleton<CreateCompanyUseCase>('CreateCompanyUseCase', CreateCompanyUseCase);
