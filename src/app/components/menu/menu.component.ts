import { Location } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from '../../service/app.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  menu = [
    {
      nome: 'SERVIÇOS',
      path: '/viva-tce/servicos',
    },
    {
      nome: 'FORNECEDORES',
      path: '/viva-tce/fornecedores',
    },
    {
      nome: 'USUÁRIOS',
      path: '/viva-tce/usuarios',
      role: 'admin'
    },
  ]

  userLogged: Signal<Usuario>


  constructor(private location: Location, private appService: AppService) {
    this.userLogged = appService.userLogged
  }

  isSelected(path: string) {
    return this.location.path().toString().startsWith(path)
  }

}
