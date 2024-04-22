import { container } from 'tsyringe';
import { DocumentValidator } from '../validator';

container.registerSingleton<DocumentValidator>('DocumentValidator', DocumentValidator);
