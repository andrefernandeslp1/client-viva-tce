import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { TituloComponent } from "../../titulo/titulo.component";
import { AppService } from '../../../service/app.service';
import { UsuarioService } from '../service/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../../model/usuario';
import { AsyncPipe } from '@angular/common';
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../fornecedor/service/fornecedor.service';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, TituloComponent, RouterModule, AsyncPipe],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {

  appService = inject(AppService);
  usuarioService = inject(UsuarioService);
  fornecedorService = inject(FornecedorService)
  router = inject(Router);

  usuarios!: WritableSignal<any[]>;

  usuarios$: Observable<Usuario[]>

  constructor() {
    this.usuarios = this.usuarioService.usuario;
    this.usuarios$ = this.usuarioService.list()
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.usuarioService.list().subscribe(users => {
      this.usuarios.set(users);
      console.log(users);
    });
  }

  deletar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.listar();
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

}
