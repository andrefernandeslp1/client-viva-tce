import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ServicoUsuario } from '../../../model/servico-usuario';
import { CompraService } from '../../../service/compra.service';
import { Servico } from '../../../model/servico';
import { ServicoService } from '../../../service/servico.service';
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

  @Input() compras!: ServicoUsuario[];

  constructor() {
    console.log(this.compras)
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
