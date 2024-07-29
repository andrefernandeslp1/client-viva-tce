import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { HeaderComponent } from "./components/header/header.component";
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxMaskDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}


