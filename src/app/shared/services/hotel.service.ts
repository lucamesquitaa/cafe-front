import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGeneric } from './generic.service';
import { DetalhesModel, DetalhesModelByManager } from '../models/hotel.model';
import { HoteisAllModel } from '../models/hoteisAll.model';
import { HttpHeaders } from '@angular/common/http';
import { ManagersModel } from '../models/managers.model';
import { ResponseApi } from '../models/response.api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService extends ServiceGeneric<ResponseApi<any>> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/Hotel";

  constructor(public override injector: Injector) {
    super(injector);
  }

  doGetAllHoteis(): Observable<ResponseApi<HoteisAllModel[]>>{
    return this.http.get<ResponseApi<HoteisAllModel[]>>(this.urlServiceREST);
  }

  doGetUserIdHoteis(): Observable<ResponseApi<HoteisAllModel[]>>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    console.log(headers);
    return this.http.get<ResponseApi<HoteisAllModel[]>>(
      this.urlServiceREST + "/ByUserId",
      { headers }
    );
  }

  doGetHotelId(hotelId: string): Observable<ResponseApi<DetalhesModel>>{
    return this.http.get<ResponseApi<DetalhesModel>>(this.urlServiceREST +"/" + hotelId);
  }

  doGetHotelByManager(hotelId: string): Observable<ResponseApi<DetalhesModelByManager>>{
    return this.http.get<ResponseApi<DetalhesModelByManager>>(this.urlServiceREST +"/ByManager/" + hotelId);
  }

  doDeleteHotel(id: string): Observable<ResponseApi>{
    //setar token Authorization
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    
    return this.http.delete<ResponseApi>(this.urlServiceREST + "/" +id, { headers});
  }

  doPostHotel(hotel: DetalhesModel, id: string | null): Observable<ResponseApi<DetalhesModel>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    if (id == null) {
      return this.http.post<ResponseApi<DetalhesModel>>(this.urlServiceREST, hotel, { headers });
    } else {
      return this.http.put<ResponseApi<DetalhesModel>>(this.urlServiceREST + "/" + id, hotel, { headers });
    }
  }

 
  
}
