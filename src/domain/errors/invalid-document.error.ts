import { UseCaseError } from '@/core/errors/use-case.error';

export class InvalidDocumentError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message ?? 'O número de documento é inválido');
    this.name = 'InvalidDocumentError';
  }
}
