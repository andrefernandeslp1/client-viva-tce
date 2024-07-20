import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-form-fornecedor',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './form-fornecedor.component.html',
  styleUrl: './form-fornecedor.component.css'
})
export class FormFornecedorComponent {

}
