import { TypeCafeEnum } from './type-cafe.enum';

export interface Cafeteria {
  id?: string;
  nome: string;
  rede: string;
  url: string;
  descricao: string;
  diferencial: string;
  ativo: boolean;
  endereco: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento: string;
  fotoPrincipal?: string;
  categoriaPrincipal: TypeCafeEnum;
  cnpj: string;
  razao: string;
  nomeRep: string;
  telRep: string;
  cpfRep: string;
  emailRep: string;
}

export interface CnpjConsultaModel {
  razaoSocial: string;
  nomeFantasia?: string;
}

export interface ExistePorCnpjModel {
  existe: boolean;
  rede?: string;
}

export interface CepConsultaModel {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
