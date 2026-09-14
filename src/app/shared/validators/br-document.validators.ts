import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { onlyDigits } from '../utils/mask.util';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = onlyDigits(control.value);
    if (!cpf) return null;

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return { cpfInvalido: true };
    }

    const digits = cpf.split('').map(Number);
    const calcVerifier = (length: number): number => {
      let sum = 0;
      for (let i = 0; i < length; i++) {
        sum += digits[i] * (length + 1 - i);
      }
      const rest = (sum * 10) % 11;
      return rest === 10 ? 0 : rest;
    };

    if (calcVerifier(9) !== digits[9] || calcVerifier(10) !== digits[10]) {
      return { cpfInvalido: true };
    }

    return null;
  };
}

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = onlyDigits(control.value);
    if (!cnpj) return null;

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return { cnpjInvalido: true };
    }

    const digits = cnpj.split('').map(Number);
    const calcVerifier = (length: number): number => {
      const weights = length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      for (let i = 0; i < length; i++) {
        sum += digits[i] * weights[i];
      }
      const rest = sum % 11;
      return rest < 2 ? 0 : 11 - rest;
    };

    if (calcVerifier(12) !== digits[12] || calcVerifier(13) !== digits[13]) {
      return { cnpjInvalido: true };
    }

    return null;
  };
}

export function telefoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const digits = onlyDigits(control.value);
    if (!digits) return null;
    if (digits.length < 10 || digits.length > 11) {
      return { telefoneInvalido: true };
    }
    return null;
  };
}

export function cepValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const digits = onlyDigits(control.value);
    if (!digits) return null;
    if (digits.length !== 8) {
      return { cepInvalido: true };
    }
    return null;
  };
}

export function urlOpcionalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) return null;

    try {
      const url = new URL(value);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return { urlInvalida: true };
      }
      return null;
    } catch {
      return { urlInvalida: true };
    }
  };
}
