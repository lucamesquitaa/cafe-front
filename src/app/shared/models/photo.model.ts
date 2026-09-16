/**
 * Foto de uma cafeteria, conforme retornado por `GET /api/photos/cafeteria/{cafeteriaId}`
 * (DTO `GetAllPhotos` do backend).
 */
export interface PhotoModel {
  id: string;
  alt: string;
  url: string;
  /** Marca a foto em destaque da cafeteria. Pode vir nulo do backend. */
  stared: boolean | null;
}
