import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoModel } from '../models/photo.model';
import { ResponseApi } from '../models/response.api';
import { ServiceGeneric } from './generic.service';

/**
 * Cliente da API de fotos (`PhotosController`):
 *  - GET    /api/photos/cafeteria/{cafeteriaId}  → lista as fotos da cafeteria (público)
 *  - POST   /api/photos/cafeteria/{cafeteriaId}  → envia arquivos (multipart) para a cafeteria
 *  - DELETE /api/photos/cafeteria/{cafeteriaId}  → remove fotos pelos ids
 */
@Injectable({
  providedIn: 'root'
})
export class PhotosService extends ServiceGeneric<ResponseApi<any>> {
  override urlServiceREST: string = environment.apiBaseUrl + '/api/photos';

  constructor(public override injector: Injector) {
    super(injector);
  }

  obterPorCafeteria(cafeteriaId: string): Observable<ResponseApi<PhotoModel[]>> {
    return this.http.get<ResponseApi<PhotoModel[]>>(`${this.urlServiceREST}/cafeteria/${cafeteriaId}`);
  }

  enviar(cafeteriaId: string, files: File[]): Observable<ResponseApi<PhotoModel[]>> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));

    const headers = this.authHeaders();
    return this.http.post<ResponseApi<PhotoModel[]>>(`${this.urlServiceREST}/cafeteria/${cafeteriaId}`, formData, { headers });
  }

  excluir(cafeteriaId: string, imageIds: string[]): Observable<ResponseApi> {
    const headers = this.authHeaders();
    return this.http.delete<ResponseApi>(`${this.urlServiceREST}/cafeteria/${cafeteriaId}`, { headers, body: imageIds });
  }

  /**
   * Escolhe a foto de destaque de uma lista: a marcada como `stared`, senão a primeira.
   */
  static fotoDestaque(fotos: PhotoModel[] | null | undefined): PhotoModel | null {
    if (!fotos || fotos.length === 0) return null;
    return fotos.find((foto) => foto.stared === true) ?? fotos[0];
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
  }
}
