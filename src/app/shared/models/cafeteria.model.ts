export interface CafeteriaModel {
  id: string;
  nome: string;
  endereco: string;
  lat: number;
  lng: number;
  notaMedia: number;
  qtdAvaliacoes: number;
  fotoUrl: string;
  categoriaPrincipal: string;
  criadoEm: string;
}

export interface CafeteriaInputModel {
  nome: string;
  endereco: string;
  lat: number;
  lng: number;
  categoriaPrincipal: string;
  fotoUrl: string;
}
