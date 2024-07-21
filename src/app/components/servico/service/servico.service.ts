import { inject, Injectable, signal } from '@angular/core';
import { Servico } from '../../../model/servico';
import { BaseService } from '../../../service/base.service';
import { AppService } from '../../../service/app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService<Servico> {

  appService = inject(AppService);

  servicos = signal<Servico[]>([{} as Servico]);

  constructor(httpClient: HttpClient, appService: AppService) {
    super(httpClient, `${appService.API_URL}/servicos`);
  }


}
