import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {

  // usuarioService = inject(UsuarioService);

  // fornecedores!: WritableSignal<Fornecedor[]>;

  constructor() {
    // this.roles = this.usuarioService.roles;
    // this.fornecedores = this.fornecedorService.fornecedores;
   }

  // ngOnInit() {
  //   this.listarFornecedores();
  //   this.id = this.route.snapshot.paramMap.get('id');
  // }



  // listarFornecedores() {
  //   this.fornecedorService.list().subscribe(fornecedores => {
  //     this.fornecedores.set(fornecedores);
  //     console.log(fornecedores);
  //   });
  // }

}
