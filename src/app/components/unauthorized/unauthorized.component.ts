import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  logoTce = './assets/tce.jpg'


  constructor(private location: Location) {}

  voltar() {
    this.location.back();
  }
}
