import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";

@Component({
  selector: 'app-detalhes-servico',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './detalhes-servico.component.html',
  styleUrl: './detalhes-servico.component.css'
})
export class DetalhesServicoComponent {

}
