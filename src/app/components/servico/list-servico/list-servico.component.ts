import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-list-servico',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './list-servico.component.html',
  styleUrl: './list-servico.component.css'
})
export class ListServicoComponent {

}
