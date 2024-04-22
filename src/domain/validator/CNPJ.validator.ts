export interface CNPJValidator {
  isValidCNPJ(document: string): boolean;
  verifierDigit(digits: string): number;
}
