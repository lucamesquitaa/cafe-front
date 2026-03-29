import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGeneric } from './generic.service';
import { QuartosModel } from '../models/quartos.model';
import { HoteisAllModel } from '../models/hoteisAll.model';
import { HttpHeaders } from '@angular/common/http';
import { ManagersModel } from '../models/managers.model';
import { ResponseApi } from '../models/response.api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuartosService extends ServiceGeneric<ResponseApi<any>> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/Quartos";

  constructor(public override injector: Injector) {
    super(injector);
  }

  doGetQuartosByHotelId(hotelId: string): Observable<ResponseApi<QuartosModel[]>>{
    return this.http.get<ResponseApi<QuartosModel[]>>(this.urlServiceREST +"/GetAllQuartos/" + hotelId);
  }

  GetQuartoById(id: string): Observable<ResponseApi<QuartosModel>>{
    return this.http.get<ResponseApi<QuartosModel>>(this.urlServiceREST +"/GetQuartoById/" + id);
  }

  doPostPutQuarto(quarto: QuartosModel, hotelId: string): Observable<ResponseApi> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
  
    return this.http.post<ResponseApi>(this.urlServiceREST +"/PostPutQuartos/" + hotelId , quarto, { headers });
    
  }
  doDeleteQuarto(quartoId: string, hotelId: string): Observable<ResponseApi> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));

    return this.http.delete<ResponseApi>(`${this.urlServiceREST}/DeleteQuarto/${hotelId}/${quartoId}`, { headers });
  }

  doPostQuartosMassa(hotelId: string, dto: any): Observable<ResponseApi> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    return this.http.post<ResponseApi>(`${this.urlServiceREST}/PostQuartosMassa/${hotelId}`, dto, { headers });
  }
}
