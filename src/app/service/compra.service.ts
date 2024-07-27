import { Injectable, signal } from '@angular/core';
import { BaseService } from './../service/base.service';
import { ServicoUsuario } from './../model/servico-usuario';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService extends BaseService<ServicoUsuario> {

  compra = signal<ServicoUsuario>({} as ServicoUsuario);

  constructor(httpClient: HttpClient) {
    super(httpClient, 'ServicosUsuarios');
  }

  getComprasUsuario(id: number) {
    return this.httpClient.get<any[]>(`${this.apiUrl}/ServicosUsuarios/usuario/${id}`);
  }

}
