import { inject, Injectable, signal } from '@angular/core';
import { Servico } from '../model/servico';
import { BaseService } from './base.service';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService<Servico> {

  appService = inject(AppService);

  servicos = signal<Servico[]>([{} as Servico]);

  constructor(httpClient: HttpClient) {
    super(httpClient, 'Servicos');
  }

  getByFornecedor(id: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.get<Servico[]>(`${this.apiUrl}/fornecedor/${id}`, {headers})
  }

}
