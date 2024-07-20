import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AppService } from '../../service/app.service';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { JWTTokenService } from '../../service/jwttoken.service';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MenuComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  tceLogo = './assets/tce.jpg'

  appService = inject(AppService);
  jwtService = inject(JWTTokenService);

  usuario!: WritableSignal<Usuario>;

  constructor() {
    this.usuario = this.appService.userLogged;
  }

  ngOnInit(): void {

  }

  logout(): void {
    localStorage.clear();
    this.usuario.set({} as Usuario);
    console.log(this.usuario());
    this.jwtService.decodedToken = undefined;
  }
}
