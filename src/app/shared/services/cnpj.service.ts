import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CnpjConsultaModel } from '../models/cafeteria-cadastro.model';
import { onlyDigits } from '../utils/mask.util';

interface BrasilApiCnpjResponse {
  razao_social: string;
  nome_fantasia?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

  private readonly urlServiceREST = 'https://brasilapi.com.br/api/cnpj/v1';

  constructor(private http: HttpClient) { }

  consultar(cnpj: string): Observable<CnpjConsultaModel> {
    const digits = onlyDigits(cnpj);
    return this.http.get<BrasilApiCnpjResponse>(`${this.urlServiceREST}/${digits}`).pipe(
      map((res) => ({
        razaoSocial: res.razao_social,
        nomeFantasia: res.nome_fantasia,
      }))
    );
  }
}
