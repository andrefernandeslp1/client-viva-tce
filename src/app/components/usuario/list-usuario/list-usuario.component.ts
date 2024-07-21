import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { TituloComponent } from "../../../titulo/titulo.component";

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, TituloComponent],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent {

}
