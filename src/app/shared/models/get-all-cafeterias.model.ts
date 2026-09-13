import { TypeCafeEnum } from './type-cafe.enum';

export interface GetAllCafeteriasModel {
  id: string;
  nome: string;
  endereco: string;
  numero: string;
  complemento: string;
  cep: string;
  fotoPrincipal: string | null;
  categoriaPrincipal: TypeCafeEnum;
}
