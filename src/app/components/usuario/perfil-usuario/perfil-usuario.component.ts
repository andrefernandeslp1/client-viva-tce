import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraService } from '../../../service/compra.service';
import { ListCompraComponent } from '../../compra/list-compra/list-compra.component';
import { ServicoUsuario } from '../../../model/servico-usuario';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../service/app.service';
import { TituloComponent } from "../../titulo/titulo.component";
import { Usuario } from '../../../model/usuario';
import { AsyncPipe } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, ListCompraComponent, TituloComponent, AsyncPipe, NgxMaskPipe],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

  userImage = "https://www.w3schools.com/howto/img_avatar.png";

  compraService = inject(CompraService);
  usuarioService = inject(UsuarioService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  usuarioId: any;
  compras?: ServicoUsuario[];

  usuario$?: Observable<Usuario>;

  httpClient = inject(HttpClient);
  appService = inject(AppService);

  constructor() {
  }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    this.getCompras();
    this.usuario$ = this.usuarioService.getOne(this.usuarioId).pipe(delay(600));
  }

  onEdit() {
    this.router.navigate(['viva-tce', 'usuarios', this.usuarioId, 'edit'])
  }

  getCompras() {
    this.listComprasByUserId(this.usuarioId).subscribe(compras => {
      this.compras = compras;
      console.log(compras);
    });
  }

  // FORMA DE RECUPERAR COMPRAS POR ID DO USUÁRIO NO ESTILO JSON-SERVER //
  listComprasByUserId(id: number) {
    return this.compraService.getComprasUsuario(id)
  }
}
