import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepConsultaModel } from '../models/cafeteria-cadastro.model';
import { onlyDigits } from '../utils/mask.util';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly urlServiceREST = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  consultar(cep: string): Observable<CepConsultaModel> {
    const digits = onlyDigits(cep);
    return this.http.get<CepConsultaModel>(`${this.urlServiceREST}/${digits}/json/`);
  }
}
