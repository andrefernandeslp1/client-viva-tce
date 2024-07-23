import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { TituloComponent } from "../../../titulo/titulo.component";
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../service/fornecedor.service';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../service/app.service';

@Component({
  selector: 'app-list-fornecedor',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    TituloComponent,
    RouterModule
  ],
  templateUrl: './list-fornecedor.component.html',
  styleUrl: './list-fornecedor.component.css'
})
export class ListFornecedorComponent {

  fornecedoresService = inject(FornecedorService);

  fornecedores!: WritableSignal<Fornecedor[]>;

  constructor(private router: Router, private appService: AppService) {
    this.fornecedores = this.fornecedoresService.fornecedores;
  }

  ngOnInit() {
    this.listarFornecedores();
  }

  listarFornecedores() {
    this.fornecedoresService.list().subscribe(fornecedores => {
      this.fornecedores.set(fornecedores);
    });
  }


  cadastrar(): void {
    this.router.navigate(['viva-tce', 'fornecedores', 'new'])
  }

  podeCadastrar(): boolean {
    return this.appService.userLogged().role === 'admin'
  }


}
