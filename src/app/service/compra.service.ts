import { Injectable, signal } from '@angular/core';
import { BaseService } from './../service/base.service';
import { ServicoUsuario } from './../model/servico-usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.get<any[]>(`${this.apiUrl}/usuario/${id}`, {headers});
  }

}
