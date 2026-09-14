export type MaskType = 'cpf' | 'cnpj' | 'telefone' | 'cep';

export function onlyDigits(value: string | null | undefined): string {
  return (value || '').replace(/\D/g, '');
}

export function applyMask(type: MaskType, rawValue: string | null | undefined): string {
  const digits = onlyDigits(rawValue);

  switch (type) {
    case 'cpf':
      return digits
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    case 'cnpj':
      return digits
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    case 'telefone':
      return digits
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    case 'cep':
      return digits
        .slice(0, 8)
        .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    default:
      return digits;
  }
}
