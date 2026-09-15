import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../models/response.api';
import { Cafeteria, ExistePorCnpjModel } from '../models/cafeteria-cadastro.model';
import { MOCK_CAFETERIA_DETALHES, MOCK_CAFETERIAS_COMPLETAS, MOCK_REDES, MOCK_REDE_POR_CNPJ } from '../mocks/cafeteria-detalhes.mock';

const CAFETERIAS_URL_FRAGMENT = '/api/cafeterias';

/**
 * @description
 * Responde as chamadas para a API de cafeterias com dados mockados quando `environment.devBypass`
 * está ativo, permitindo navegar por toda a aplicação sem um backend real disponível.
 */
@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('[MockApiInterceptor] url=', req.url, 'devBypass=', environment.devBypass, 'includesFragment=', req.url.includes(CAFETERIAS_URL_FRAGMENT));
    if (!environment.devBypass || !req.url.includes(CAFETERIAS_URL_FRAGMENT)) {
      return next.handle(req);
    }

    const body = this.handleCafeteriasRequest(req);
    console.log('[MockApiInterceptor] handled body=', body);
    if (body === null) {
      return next.handle(req);
    }

    return of(new HttpResponse({ status: 200, body })).pipe(delay(300));
  }

  private handleCafeteriasRequest(req: HttpRequest<any>): ResponseApi<any> | null {
    const path = req.url.split(CAFETERIAS_URL_FRAGMENT)[1] || '';
    const idMatch = path.match(/^\/([^/]+)$/);

    if (req.method === 'GET' && path === '/redes') {
      const termo = (req.params.get('termo') || '').toLowerCase();
      const data = MOCK_REDES.filter((rede) => rede.toLowerCase().includes(termo));
      return this.ok(data);
    }

    if (req.method === 'GET' && path === '/existe-cnpj') {
      const cnpj = req.params.get('cnpj') || '';
      const rede = MOCK_REDE_POR_CNPJ[cnpj];
      const data: ExistePorCnpjModel = rede ? { existe: true, rede } : { existe: false };
      return this.ok(data);
    }

    if (req.method === 'GET' && path === '') {
      return this.ok(MOCK_CAFETERIA_DETALHES);
    }

    if (req.method === 'GET' && idMatch) {
      const cafeteria = MOCK_CAFETERIAS_COMPLETAS.find((c) => c.id === idMatch[1]);
      return this.ok(cafeteria ?? MOCK_CAFETERIAS_COMPLETAS[0]);
    }

    if (req.method === 'POST' && path === '') {
      const criada: Cafeteria = { ...(req.body as Cafeteria), id: 'mock-' + Date.now() };
      return this.ok(criada, 'Cafeteria cadastrada com sucesso (mock).');
    }

    if (req.method === 'PUT' && idMatch) {
      const atualizada: Cafeteria = { ...(req.body as Cafeteria), id: idMatch[1] };
      return this.ok(atualizada, 'Cafeteria atualizada com sucesso (mock).');
    }

    return null;
  }

  private ok<T>(data: T, mensagem = 'OK'): ResponseApi<T> {
    return { sucesso: true, success: true, mensagem, data };
  }
}
