import { ServicoService } from './../service/servico.service';
import { Component, inject, Input, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { Servico } from '../../../model/servico';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TituloComponent } from "../../titulo/titulo.component";
import { AppService } from '../../../service/app.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-servico',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, RouterModule, TituloComponent, AsyncPipe],
  templateUrl: './list-servico.component.html',
  styleUrl: './list-servico.component.css'
})
export class ListServicoComponent {

  service = inject(ServicoService);

  servicos!: WritableSignal<Servico[]>;

  servicos$: Observable<Servico[]>

  constructor(private router: Router, private appService: AppService) {
    this.servicos$ = this.service.list();
  }

  /*ngOnInit() {
    this.servicos$ = 
  }*/

  listar() {
    this.service.list().subscribe(servicos => {
      this.servicos.set(servicos);
      console.log(servicos);
    });
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

}
