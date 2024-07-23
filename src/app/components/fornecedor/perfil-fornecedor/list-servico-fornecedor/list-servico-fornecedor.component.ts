import { Component, Input } from '@angular/core';
import { Servico } from '../../../../model/servico';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-servico-fornecedor',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './list-servico-fornecedor.component.html',
  styleUrl: './list-servico-fornecedor.component.css'
})
export class ListServicoFornecedorComponent {

  @Input() servicos!: any[];

  constructor() {

  }


}
