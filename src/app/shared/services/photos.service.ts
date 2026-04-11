import { Injectable, Injector } from '@angular/core';
import { ServiceGeneric } from './generic.service';
import { ResponseApi } from '../models/response.api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService extends ServiceGeneric<ResponseApi<any>> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/Photos/";

  constructor(public override injector: Injector) {
    super(injector);
  }

  getPhotos(hotelId: string) {
    let api = this.urlServiceREST + hotelId;
    return this.http.get<ResponseApi<any>>(api);
  }

  getPhotosQuarto(quartoId: string) {
    let api = this.urlServiceREST + "Quarto/" + quartoId;
    return this.http.get<ResponseApi<any>>(api);
  }

  postPhotos(formData: FormData, hotelId: string, quartoId?: string) {
    let api = this.urlServiceREST + hotelId + "/fotos";
    if (quartoId !== null && quartoId !== undefined) {
      api += `?quartoId=${quartoId}`;
    }
    return this.http.post<ResponseApi<any>>(api, formData);
  }

  deletePhotosEmLote(imgIds: string[]) {
    let api = this.urlServiceREST ;
    return this.http.delete<ResponseApi<any>>(api, { body: imgIds });
  }
}