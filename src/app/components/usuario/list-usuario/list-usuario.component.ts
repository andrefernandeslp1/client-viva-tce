import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { TituloComponent } from "../../titulo/titulo.component";
import { AppService } from '../../../service/app.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { Usuario } from '../../../model/usuario';
import { AsyncPipe } from '@angular/common';
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, TituloComponent, RouterModule, AsyncPipe],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent implements OnInit {

  appService = inject(AppService);
  usuarioService = inject(UsuarioService);
  fornecedorService = inject(FornecedorService)
  router = inject(Router);

  usuarios$?: Observable<Usuario[]>

  constructor() {
  }

  ngOnInit() {
    this.usuarios$ = this.usuarioService.list().pipe(delay(600))
  }


  deletar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarios$ = this.usuarioService.list()
    });
  }

  verPerfil(id: number) {
    this.router.navigate(['viva-tce', 'usuarios', id, 'perfil'])
  }

  onCadastrar() {
    this.router.navigate(['viva-tce', 'usuarios', 'new'])
  }

  podeCadastrar(): boolean {
    return this.appService.userLogged().role === 'admin'
  }

  pesquisar(value: string) {
    this.usuarios$ = this.usuarioService.filterByNome(value).pipe(delay(600))
  }

}
