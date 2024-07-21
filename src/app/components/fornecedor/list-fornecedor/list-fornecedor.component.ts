import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { TituloComponent } from "../../../titulo/titulo.component";

@Component({
  selector: 'app-list-fornecedor',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, TituloComponent],
  templateUrl: './list-fornecedor.component.html',
  styleUrl: './list-fornecedor.component.css'
})
export class ListFornecedorComponent {








}
