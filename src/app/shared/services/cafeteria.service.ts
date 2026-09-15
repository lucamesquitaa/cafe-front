import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CafeteriaInputModel, CafeteriaModel } from '../models/cafeteria.model';
import { ServiceGeneric } from './generic.service';
import { ResponseApi } from '../models/response.api';
import { Cafeteria, ExistePorCnpjModel } from '../models/cafeteria-cadastro.model';
import { onlyDigits } from '../utils/mask.util';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService extends ServiceGeneric<ResponseApi<any>> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/cafeterias";

  constructor(public override injector: Injector) {
    super(injector);
  }

  doGetAll(lat?: number, lng?: number, page: number = 1, pageSize: number = 20): Observable<ResponseApi<CafeteriaModel[]>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (lat != null) {
      params = params.set('lat', lat);
    }
    if (lng != null) {
      params = params.set('lng', lng);
    }

    return this.http.get<ResponseApi<CafeteriaModel[]>>(this.urlServiceREST, { params });
  }

  doGetById(id: string): Observable<ResponseApi<CafeteriaModel>> {
    return this.http.get<ResponseApi<CafeteriaModel>>(this.urlServiceREST + "/" + id);
  }

  obterCadastroCompleto(id: string): Observable<ResponseApi<Cafeteria>> {
    const headers = this.authHeaders();
    return this.http.get<ResponseApi<Cafeteria>>(this.urlServiceREST + "/" + id, { headers });
  }

  doCreate(cafeteria: CafeteriaInputModel): Observable<ResponseApi<CafeteriaModel>> {
    const headers = this.authHeaders();
    return this.http.post<ResponseApi<CafeteriaModel>>(this.urlServiceREST, cafeteria, { headers });
  }

  doUpdate(id: string, cafeteria: Cafeteria): Observable<ResponseApi<Cafeteria>> {
    const headers = this.authHeaders();
    return this.http.put<ResponseApi<Cafeteria>>(this.urlServiceREST + "/" + id, cafeteria, { headers });
  }

  existePorCnpj(cnpj: string): Observable<ResponseApi<ExistePorCnpjModel>> {
    const params = new HttpParams().set('cnpj', onlyDigits(cnpj));
    return this.http.get<ResponseApi<ExistePorCnpjModel>>(this.urlServiceREST + '/existe-cnpj', { params });
  }

  buscarRedes(termo: string): Observable<ResponseApi<string[]>> {
    const params = new HttpParams().set('termo', termo);
    return this.http.get<ResponseApi<string[]>>(this.urlServiceREST + '/redes', { params });
  }

  criarCadastroCompleto(cafeteria: Cafeteria): Observable<ResponseApi<Cafeteria>> {
    const headers = this.authHeaders();
    return this.http.post<ResponseApi<Cafeteria>>(this.urlServiceREST, cafeteria, { headers });
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
  }
}
