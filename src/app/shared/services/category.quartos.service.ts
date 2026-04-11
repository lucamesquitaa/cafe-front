import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGeneric } from './generic.service';
import { QuartosModel } from '../models/quartos.model';
import { HttpHeaders } from '@angular/common/http';
import { ResponseApi } from '../models/response.api';
import { CategoryQuartosModel } from '../models/categoryQuartos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryQuartosService extends ServiceGeneric<ResponseApi<any>> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/CategoryQuarto";

  constructor(public override injector: Injector) {
    super(injector);
  }

  doGetCategoryQuartosByHotelId(hotelId: string): Observable<ResponseApi<CategoryQuartosModel[]>>{
    return this.http.get<ResponseApi<CategoryQuartosModel[]>>(this.urlServiceREST +"/" + hotelId);
  }

  doGetCategoryQuartoById(id: string): Observable<ResponseApi<CategoryQuartosModel>> {
    return this.http.get<ResponseApi<CategoryQuartosModel>>(this.urlServiceREST + "/GetById/" + id);
  }

  doPostCategoryQuarto(categoryQuarto: CategoryQuartosModel, hotelId: string): Observable<ResponseApi> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    return this.http.post<ResponseApi>(this.urlServiceREST +"/PostCategoryQuarto/" + hotelId , categoryQuarto, { headers });
  }

  doPutCategoryQuarto(id: string, categoryQuarto: CategoryQuartosModel): Observable<ResponseApi> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    return this.http.put<ResponseApi>(this.urlServiceREST + "/PutCategoryQuarto/" + id , categoryQuarto, { headers });
  }

  doDeleteCategoryQuarto(id: string): Observable<ResponseApi>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    return this.http.delete<ResponseApi>(this.urlServiceREST + "/" +id, { headers});
  }
 
  
}
