import { CNPJValidator, CPFValidator } from '@/domain/validator';
import { injectable } from 'tsyringe';

@injectable()
export class DocumentValidator implements CNPJValidator, CPFValidator {
  private readonly BLACKLIST = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ];

  isValidCPF(document: string): boolean {
    const cpfNumbers = document.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) return false;

    if (document === '00000000000') return false;

    const cpfNumbersArray = cpfNumbers.split('').map(Number);
    const firstDigit = cpfNumbersArray[9];
    const secondDigit = cpfNumbersArray[10];

    const firstDigitSum = cpfNumbersArray
      .slice(0, 9)
      .reduce((acc, curr, index) => acc + curr * (10 - index), 0);
    const firstDigitMod = firstDigitSum % 11;
    const firstDigitResult = firstDigitMod < 2 ? 0 : 11 - firstDigitMod;

    const secondDigitSum = cpfNumbersArray
      .slice(0, 10)
      .reduce((acc, curr, index) => acc + curr * (11 - index), 0);
    const secondDigitMod = secondDigitSum % 11;

    const secondDigitResult = secondDigitMod < 2 ? 0 : 11 - secondDigitMod;

    return firstDigitResult === firstDigit && secondDigitResult === secondDigit;
  }

  isValidCNPJ(document: string): boolean {
    const stripped = document.replace(/\D/g, '');

    if (stripped.length !== 14) return false;

    if (this.BLACKLIST.includes(stripped)) {
      return false;
    }

    let numbers: string = stripped.substring(0, 12);
    numbers += this.verifierDigit(numbers);
    numbers += this.verifierDigit(numbers);

    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    return numbers.substring(-2) === stripped.substring(-2);
  }

  verifierDigit(digits: string): number {
    let index = 2;

    const reverse = digits.split('').reduce((buffer, number) => {
      return [parseInt(number, 10)].concat(buffer);
    }, [] as number[]);

    const sum = reverse.reduce((buffer, number) => {
      const tempNum = buffer + number * index;
      index = index === 9 ? 2 : index + 1;
      return tempNum;
    }, 0);

    const mod: number = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }

  public validate(document: string): boolean {
    const isCNPJ = document.length === 14;

    if (isCNPJ) {
      return this.isValidCNPJ(document);
    }

    return this.isValidCPF(document);
  }
}
