import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ServicoUsuario } from '../../../model/servico-usuario';
import { CompraService } from '../../../service/compra.service';
import { Servico } from '../../../model/servico';
import { ServicoService } from '../../../service/servico.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TituloComponent } from "../../titulo/titulo.component";
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-list-compra',
  standalone: true,
  imports: [
    RouterModule,
    TituloComponent,
    NgxMaskPipe
],
  templateUrl: './list-compra.component.html',
  styleUrl: './list-compra.component.css'
})
export class ListCompraComponent {

  servicoService = inject(ServicoService);
  compraService = inject(CompraService);

  @Input() compras?: ServicoUsuario[];

  constructor() {}

  obterDataFormatada(data: Date): string {
    data = new Date(data.valueOf())
    return data.toLocaleDateString()
  }

  deletar(id: number) {
    this.compraService.delete(id).subscribe({
      next: () => {
        if(this.compras){
          this.compras = this.compras.filter(compra => compra.id !== id);
        }
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
