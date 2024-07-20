import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-perfil-fornecedor',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './perfil-fornecedor.component.html',
  styleUrl: './perfil-fornecedor.component.css'
})
export class PerfilFornecedorComponent {

}
