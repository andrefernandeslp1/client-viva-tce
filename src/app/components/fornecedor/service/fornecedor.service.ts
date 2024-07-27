import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AppService } from '../../../service/app.service';
import { BaseService } from '../../../service/base.service';
import { Fornecedor } from '../../../model/fornecedor';
import { Observable } from 'rxjs';
import { Servico } from '../../../model/servico';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends BaseService<Fornecedor> {

  fornecedores = signal<Fornecedor[]>([{} as Fornecedor]);

  constructor(httpClient: HttpClient) {
    super(httpClient, 'Fornecedores');
  }

  getServicos(id: number): Observable<Servico[]> {
    return this.httpClient.get<Servico[]>(`${this.apiUrl}/Servicos/fornecedor/${id}`);
  }

}
