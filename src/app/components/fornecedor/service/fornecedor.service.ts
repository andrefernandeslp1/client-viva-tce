import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AppService } from '../../../service/app.service';
import { BaseService } from '../../../service/base.service';
import { Fornecedor } from '../../../model/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends BaseService<Fornecedor> {

  fornecedores = signal<Fornecedor[]>([{} as Fornecedor]);

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/servico`);
  }

}
