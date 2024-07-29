import { CompraService } from './../../../service/compra.service';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { ServicoUsuario } from '../../../model/servico-usuario';
import { Servico } from '../../../model/servico';
import { AppService } from '../../../service/app.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ServicoService } from '../../../service/servico.service';
import { FormsModule } from '@angular/forms';
import { delay, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TituloComponent } from "../../titulo/titulo.component";
import { Usuario } from '../../../model/usuario';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-detalhes-servico',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule,
    AsyncPipe,
    RouterModule,
    TituloComponent,
    NgxMaskPipe
],
  templateUrl: './detalhes-servico.component.html',
  styleUrl: './detalhes-servico.component.css'
})
export class DetalhesServicoComponent {

  compraService = inject(CompraService);
  servicoService = inject(ServicoService);
  appService = inject(AppService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  compra = {} as ServicoUsuario;

  servico$?: Observable<Servico>;
  userLogged: Signal<Usuario>;

  usuarioId!: number;
  servicoId!: number;
  assinatura = false;

  constructor() {
    this.usuarioId = this.appService.userLogged().id;
    const servicoIdString = this.route.snapshot.paramMap.get('id');
    this.servicoId = servicoIdString ? parseInt(servicoIdString) : 0;
    this.userLogged = this.appService.userLogged;
  }

  ngOnInit() {
    this.servico$ = this.servicoService.getOne(this.servicoId)
  }


  comprar() {
    this.compra.servicoId = this.servicoId,
    this.compra.usuarioId = this.usuarioId,
    this.compra.data = new Date(),
    this.compra.assinatura = this.assinatura

    this.compraService.create(this.compra).subscribe(() => {
      console.log('Compra realizada com sucesso');
    });
    this.router.navigate(['/viva-tce']);
  }

  switchAssinatura() {
    this.assinatura = !this.assinatura;
  }

  editar(id: number, fornecedor: number) {
    this.router.navigate(['viva-tce', 'servicos', fornecedor, id, 'edit'])
  }
}
