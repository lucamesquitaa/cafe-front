export interface ConfiguracaoCamaDTO {
  bedType: number;
  quantity: number;
}

export interface CategoryQuartosModel {
  id?: string;
  detalhesModelId?: string;
  name: string;
  number?: number;
  minHospedes?: number;
  maxHospedes?: number;
  descricao?: string;
  configuracaoCamas?: ConfiguracaoCamaDTO[];
  aceitaCamaExtra?: boolean;
  aceitaBerco?: boolean;
}