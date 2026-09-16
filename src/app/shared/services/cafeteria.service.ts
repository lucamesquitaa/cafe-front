import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CafeteriaInputModel, CafeteriaModel } from '../models/cafeteria.model';
import { GetAllCafeteriasModel } from '../models/get-all-cafeterias.model';
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

  doGetAll(lat?: number, lng?: number, page: number = 1, pageSize: number = 20): Observable<ResponseApi<GetAllCafeteriasModel[]>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (lat != null) {
      params = params.set('lat', lat);
    }
    if (lng != null) {
      params = params.set('lng', lng);
    }

    return this.http.get<ResponseApi<GetAllCafeteriasModel[]>>(this.urlServiceREST, { params });
  }

  doGetById(id: string): Observable<ResponseApi<CafeteriaModel>> {
    return this.http.get<ResponseApi<CafeteriaModel>>(this.urlServiceREST + "/" + id);
  }

  obterCadastroCompleto(id: string): Observable<ResponseApi<Cafeteria>> {
    const headers = this.authHeaders();
    return this.http.get<ResponseApi<Cafeteria>>(this.urlServiceREST + "/ByManager/" + id, { headers });
  }

  doCreate(cafeteria: CafeteriaInputModel): Observable<ResponseApi<CafeteriaModel>> {
    const headers = this.authHeaders();
    return this.http.post<ResponseApi<CafeteriaModel>>(this.urlServiceREST, cafeteria, { headers });
  }

  doUpdate(id: string, cafeteria: Cafeteria, foto?: File | null): Observable<ResponseApi<Cafeteria>> {
    const headers = this.authHeaders();
    const formData = this.montarFormData(cafeteria, foto);
    return this.http.put<ResponseApi<Cafeteria>>(this.urlServiceREST + "/" + id, formData, { headers });
  }

  existePorCnpj(cnpj: string): Observable<ResponseApi<ExistePorCnpjModel>> {
    const params = new HttpParams().set('cnpj', onlyDigits(cnpj));
    return this.http.get<ResponseApi<ExistePorCnpjModel>>(this.urlServiceREST + '/existe-cnpj', { params });
  }

  buscarRedes(termo: string): Observable<ResponseApi<string[]>> {
    const params = new HttpParams().set('termo', termo);
    return this.http.get<ResponseApi<string[]>>(this.urlServiceREST + '/redes', { params });
  }

  criarCadastroCompleto(cafeteria: Cafeteria, foto?: File | null): Observable<ResponseApi<Cafeteria>> {
    const headers = this.authHeaders();
    const formData = this.montarFormData(cafeteria, foto);
    return this.http.post<ResponseApi<Cafeteria>>(this.urlServiceREST, formData, { headers });
  }

  private montarFormData(cafeteria: Cafeteria, foto?: File | null): FormData {
    const formData = new FormData();

    formData.append('nome', cafeteria.nome);
    formData.append('rede', cafeteria.rede);
    formData.append('url', cafeteria.url || '');
    formData.append('descricao', cafeteria.descricao);
    formData.append('diferencial', cafeteria.diferencial);
    formData.append('ativo', String(cafeteria.ativo));
    formData.append('endereco', cafeteria.endereco);
    formData.append('numero', cafeteria.numero);
    formData.append('cep', cafeteria.cep);
    formData.append('cidade', cafeteria.cidade);
    formData.append('estado', cafeteria.estado);
    formData.append('complemento', cafeteria.complemento || '');
    formData.append('categoriaPrincipal', String(cafeteria.categoriaPrincipal));
    formData.append('cnpj', cafeteria.cnpj);
    formData.append('razao', cafeteria.razao);
    formData.append('nomeRep', cafeteria.nomeRep);
    formData.append('telRep', cafeteria.telRep);
    formData.append('cpfRep', cafeteria.cpfRep);
    formData.append('emailRep', cafeteria.emailRep);

    if (foto) {
      formData.append('fotoPrincipal', foto, foto.name);
    }

    return formData;
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
  }
}
