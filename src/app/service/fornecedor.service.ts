import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AppService } from './app.service';
import { BaseService } from './base.service';
import { Fornecedor } from '../model/fornecedor';
import { Observable } from 'rxjs';
import { Servico } from '../model/servico';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends BaseService<Fornecedor> {

  fornecedores = signal<Fornecedor[]>([{} as Fornecedor]);

  constructor(httpClient: HttpClient) {
    super(httpClient, 'Fornecedores');
  }

}
