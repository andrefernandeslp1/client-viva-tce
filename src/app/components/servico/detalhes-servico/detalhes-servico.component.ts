import { CompraService } from './../../../service/compra.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { ServicoUsuario } from '../../../model/servico-usuario';
import { Servico } from '../../../model/servico';
import { AppService } from '../../../service/app.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ServicoService } from '../service/servico.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-servico',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule
  ],
  templateUrl: './detalhes-servico.component.html',
  styleUrl: './detalhes-servico.component.css'
})
export class DetalhesServicoComponent {

  compraService = inject(CompraService);
  servicoService = inject(ServicoService);
  appService = inject(AppService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  compra = {} as ServicoUsuario;
  servico = signal<Servico>({} as Servico);

  usuarioId!: number;
  servicoId!: number;
  assinatura = false;

  constructor() {
    this.usuarioId = this.appService.userLogged().id;
    const servicoIdString = this.route.snapshot.paramMap.get('id');
    this.servicoId = servicoIdString ? parseInt(servicoIdString) : 0;
  }

  ngOnInit() {
    this.getServico();
  }

  getServico() {
    this.servicoService.getOne(this.servicoId).subscribe((servico) => {
      this.servico.set(servico);
    });
  }

  comprar() {
    this.compra.servicoId = this.servicoId,
    this.compra.usuarioId = this.usuarioId,
    this.compra.data = new Date().toISOString(),
    this.compra.assinatura = this.assinatura

    this.compraService.create(this.compra).subscribe(() => {
      console.log('Compra realizada com sucesso');
    });
    this.router.navigate(['/viva-tce']);
  }

  switchAssinatura() {
    this.assinatura = !this.assinatura;
  }

}
