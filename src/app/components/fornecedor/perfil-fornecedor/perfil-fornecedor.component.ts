import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { Fornecedor } from '../../../model/fornecedor';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FornecedorService } from '../../../service/fornecedor.service';
import { AppService } from '../../../service/app.service';
import { HttpClient } from '@angular/common/http';
import { ListServicoFornecedorComponent } from "./list-servico-fornecedor/list-servico-fornecedor.component";
import { Observable } from 'rxjs';
import { ServicoService } from '../../../service/servico.service';
import { TituloComponent } from "../../titulo/titulo.component";
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-perfil-fornecedor',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    RouterModule,
    ListServicoFornecedorComponent,
    TituloComponent,
    NgxMaskPipe
],
  templateUrl: './perfil-fornecedor.component.html',
  styleUrl: './perfil-fornecedor.component.css'
})
export class PerfilFornecedorComponent {

  route = inject(ActivatedRoute);
  router = inject(Router);
  fornecedorService = inject(FornecedorService);
  servicoService = inject(ServicoService)
  appService = inject(AppService);
  httpClient = inject(HttpClient);

  fornecedor!: Fornecedor;
  fornecedorId: any;
  servicos!: any[];

  userLogged!: WritableSignal<any>;

  constructor() {
    this.fornecedorId = this.route.snapshot.paramMap.get('id');
    this.userLogged = this.appService.userLogged;
  }

  ngOnInit() {
    this.getFornecedor();
    this.getServicos();
  }

  getFornecedor() {
    this.fornecedorService.getOne(this.fornecedorId).subscribe((fornecedor) => {
      this.fornecedor = fornecedor;
    });
  }

  getServicos() {
    this.listServicosByFornecedorId(this.fornecedorId).subscribe(servicos => {
      this.servicos = servicos;
      console.log('AQUI: ' + servicos);
    });
  }

  // FORMA DE RECUPERAR SERVICOS POR ID DO FORNECEDOR NO ESTILO JSON-SERVER //
  listServicosByFornecedorId(id: number) {
    return this.servicoService.getByFornecedor(id)
  }
}
