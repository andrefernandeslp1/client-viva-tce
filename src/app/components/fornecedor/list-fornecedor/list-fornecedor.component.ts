import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { TituloComponent } from "../../titulo/titulo.component";
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { delay, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Usuario } from '../../../model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-list-fornecedor',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    TituloComponent,
    RouterModule,
    AsyncPipe,
    NgxMaskPipe
  ],
  templateUrl: './list-fornecedor.component.html',
  styleUrl: './list-fornecedor.component.css'
})
export class ListFornecedorComponent {

  fornecedoresService = inject(FornecedorService);

  fornecedores$?: Observable<Fornecedor[]>;
  
  userLogged: Signal<Usuario>

  constructor(private router: Router, private appService: AppService, private snackBar: MatSnackBar) {
    this.userLogged = appService.userLogged
  }

  ngOnInit() {
    this.fornecedores$ = this.fornecedoresService.list().pipe(delay(600))
  }

  cadastrar(): void {
    this.router.navigate(['viva-tce', 'fornecedores', 'new'])
  }

  podeCadastrar(): boolean {
    return this.appService.userLogged().role === 'admin'
  }

  podeEditar(id: number): boolean {
    return this.userLogged().role === 'admin' || this.userLogged().fornecedorId == id
  }

  podeRemover(): boolean {
    return this.userLogged().role === 'admin'
  }

  remover(id: number) {
    this.fornecedoresService.delete(id).subscribe({
      next: (res: Fornecedor) => {
        this.snackBar.open(`${res.nome} deletado com sucesso.`, '', {duration: 3000})
        this.fornecedores$ = this.fornecedoresService.list()
      },
      error: (e) => {
        this.snackBar.open(`Não foi possível deletar esse fornecedor.`, '', {duration: 3000})
      }
    })
  }

  editar(id: number) {
    this.router.navigate(['viva-tce', 'fornecedores', id, 'edit'])
  }

  pesquisar(value: string) {
    this.fornecedores$ = this.fornecedoresService.filterByNome(value).pipe(delay(600))
  }

}
