import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ServicoUsuario } from '../../../model/servico-usuario';
import { CompraService } from '../../../service/compra.service';
import { Servico } from '../../../model/servico';
import { ServicoService } from '../../servico/service/servico.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-list-compra',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './list-compra.component.html',
  styleUrl: './list-compra.component.css'
})
export class ListCompraComponent {

  servicoService = inject(ServicoService);
  compraService = inject(CompraService);

  servicos: Servico[] = [];

  @Input() compras!: ServicoUsuario[];

  constructor() {

  }

  ngOnChanges() {
    this.compras.forEach(compra => {
      this.getServicoById(compra.servicoId);
      console.log('Compra: ', compra.servicoId);
    }
    );
  }

  getServicoById(id: number) {
    this.servicoService.getOne(id).subscribe({
      next: (servico) => {
        this.servicos.push(servico);
      }
    });
  }

  deletar(id: number) {
    this.compraService.delete(id).subscribe({
      next: () => {
        this.compras = this.compras.filter(compra => compra.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Compra deletada com sucesso');
      }
    });
  }
}
