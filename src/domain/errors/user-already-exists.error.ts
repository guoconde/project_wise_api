import { UseCaseError } from '@/core/errors/use-case.error';

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Usuário já cadastrado nessa empresa');
    this.name = 'UserAlreadyExistsError';
  }
}
