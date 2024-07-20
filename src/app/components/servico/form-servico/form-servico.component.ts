import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-form-servico',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './form-servico.component.html',
  styleUrl: './form-servico.component.css'
})
export class FormServicoComponent {

}
