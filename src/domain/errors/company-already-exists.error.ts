import { UseCaseError } from '@/core/errors/use-case.error';

export class CompanyAlreadyExistsError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Empresa já cadastrada');
    this.name = 'CompanyAlreadyExistsError';
  }
}
