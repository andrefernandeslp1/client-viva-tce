import { Injectable, signal } from '@angular/core';
import { BaseService } from '../../../service/base.service';
import { Servico } from '../../../model/servico';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../service/app.service';
import { Usuario } from '../../../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

  roles = ['cliente', 'vendedor', 'admin'];

  usuario = signal<any>({});

  constructor(httpClient: HttpClient) {
    super(httpClient, 'Usuarios');
  }


}
