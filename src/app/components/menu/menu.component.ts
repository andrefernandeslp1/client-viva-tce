import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    },
  ]


  constructor(private location: Location) {}

  isSelected(path: string) {
    return this.location.path().toString().startsWith(path)
  }

}
