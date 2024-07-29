import { ServicoService } from '../../../service/servico.service';
import { Component, inject, Input, Signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { Servico } from '../../../model/servico';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TituloComponent } from "../../titulo/titulo.component";
import { AppService } from '../../../service/app.service';
import { delay, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FilterComponent } from "../../filter/filter.component";
import { Usuario } from '../../../model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-servico',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, RouterModule, TituloComponent, AsyncPipe, FilterComponent],
  templateUrl: './list-servico.component.html',
  styleUrl: './list-servico.component.css'
})
export class ListServicoComponent {

  service = inject(ServicoService);

  servicos$: Observable<Servico[]>

  userLogged: Signal<Usuario>

  constructor(private router: Router, private appService: AppService, private snackBar: MatSnackBar) {
    this.servicos$ = this.service.list().pipe(delay(600));
    this.userLogged = appService.userLogged
  }


  deletar(id: number) {
    this.service.delete(id);
  }

  novoServico() {
    this.router.navigate(['viva-tce', 'servicos', 'new'])
  }

  podeCadastrar(): boolean {
    return this.appService.userLogged().role === 'vendedor'
  }

  pesquisar(value: string) {
    this.servicos$ = this.service.filterByNome(value).pipe(delay(600))
  }

  podeEditar(fornecedorId: number) {
    return this.userLogged().fornecedorId == fornecedorId
  }

  podeRemover(fornecedorId: number) {
    return this.userLogged().fornecedorId == fornecedorId
  }

  editar(id: number, fornecedor: number) {
    this.router.navigate(['viva-tce', 'servicos', fornecedor, id, 'edit'])
  }

  remover(id: number) {
    this.service.delete(id).subscribe({
      next: (res: Servico) => {
        this.snackBar.open(`${res.nome} removido com sucesso.`, '', {duration: 3000})
        this.servicos$ = this.service.list()
      },
      error: (e) => {
        this.snackBar.open('Não foi possível remover esse serviço.', '', {duration: 3000})
      }
    })
  }
}
