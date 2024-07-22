import { Injectable, signal } from '@angular/core';
import { BaseService } from './../service/base.service';
import { ServicoUsuario } from './../model/servico-usuario';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService extends BaseService<ServicoUsuario> {

  compra = signal<ServicoUsuario>({} as ServicoUsuario);

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/compras`);
  }

}
