export enum TypeCafeEnum {
  CafeteriaTradicional = 0,
  CafeteriaEspecializada = 1,
  Padaria = 2,
  CafeColonial = 3,
  Confeitaria = 4,
  CafeteriaVeganaOuVegetariana = 5,
}

export const TypeCafeEnumLabel: Record<TypeCafeEnum, string> = {
  [TypeCafeEnum.CafeteriaTradicional]: 'Cafeteria tradicional',
  [TypeCafeEnum.CafeteriaEspecializada]: 'Cafeteria especializada',
  [TypeCafeEnum.Padaria]: 'Padaria',
  [TypeCafeEnum.CafeColonial]: 'Café colonial',
  [TypeCafeEnum.Confeitaria]: 'Confeitaria',
  [TypeCafeEnum.CafeteriaVeganaOuVegetariana]: 'Cafeteria vegana/vegetariana',
};
