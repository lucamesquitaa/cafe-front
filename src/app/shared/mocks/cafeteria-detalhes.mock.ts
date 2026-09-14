import { CafeteriaModel } from '../models/cafeteria.model';
import { TypeCafeEnumLabel } from '../models/type-cafe.enum';
import { MOCK_CAFETERIAS } from './cafeterias.mock';

function enderecoCompleto(endereco: string, numero: string, complemento: string): string {
  return [endereco, numero, complemento].filter(Boolean).join(', ');
}

// Detalhe completo de cada cafeteria do MOCK_CAFETERIAS, usado pelo GET /api/cafeterias e /api/cafeterias/:id
export const MOCK_CAFETERIA_DETALHES: CafeteriaModel[] = MOCK_CAFETERIAS.map((c, index) => ({
  id: c.id,
  nome: c.nome,
  endereco: enderecoCompleto(c.endereco, c.numero, c.complemento),
  lat: -25.4284 + index * 0.01,
  lng: -49.2733 + index * 0.01,
  notaMedia: [4.8, 4.5, 4.2, 4.9, 4.6, 0, 4.3, 4.7][index] ?? 4.5,
  qtdAvaliacoes: [128, 76, 54, 203, 41, 0, 19, 88][index] ?? 0,
  fotoUrl: c.fotoPrincipal || 'https://picsum.photos/seed/cafeteria-sem-foto/600/400',
  categoriaPrincipal: TypeCafeEnumLabel[c.categoriaPrincipal],
  criadoEm: new Date(2024, index % 12, (index * 3) % 28 + 1).toISOString(),
}));

// Redes de cafeterias usadas na autocomplete do cadastro (GET /api/cafeterias/redes)
export const MOCK_REDES: string[] = [
  'Grão Especial',
  'Café Colonial da Vovó',
  'Doce Confeitaria',
  'Aroma & Grãos',
];

// CNPJs que já existem cadastrados, usados para simular a detecção de rede existente
export const MOCK_REDE_POR_CNPJ: Record<string, string> = {
  '11222333000181': 'Grão Especial',
};
