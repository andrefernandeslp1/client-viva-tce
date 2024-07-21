import { Injectable, signal } from '@angular/core';
import { BaseService } from '../../../service/base.service';
import { Servico } from '../../../model/servico';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../service/app.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Servico> {

  roles = ['cliente', 'vendedor', 'admin'];

  usuario = signal<any>({});

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/usuarios`);
  }


}
