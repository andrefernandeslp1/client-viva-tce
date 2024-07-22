import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { HeaderComponent } from "./components/header/header.component";
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  constructor() {
    // let token = ""

    // ADMIN
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibm9tZSI6IkpvaG4gQWRtaW5pc3RyYWRvciIsImVtYWlsIjoidmVuZGVkb3JAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyMn0.1vCVraALC9hbRi-E5QCDlRp-FHZ8pKPtTVuHGdDpDnA"

    // VENDEDOR
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibm9tZSI6IkpvaG4gVmVuZGVkb3IiLCJlbWFpbCI6InZlbmRlZG9yQGdtYWlsLmNvbSIsInJvbGUiOiJ2ZW5kZWRvciIsImZvcm5lY2Vkb3JJZCI6IjAiLCJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.4O6SbWYLSzptXLcwSKnyajPvU34CYY4zQMN-uB-SRcQ"

    try {
      let decodedToken = jwtDecode<JwtPayload & {id: number; nome: string; email: string; role: string}>(token);
      console.log(decodedToken);
      console.log(decodedToken.id);
      console.log(decodedToken.nome);
      console.log(decodedToken.email);
      console.log(decodedToken.role);
    } catch (error) {
      console.log(error);
    }

    //document.cookie = "jwt-token="+ token;
    localStorage.setItem("jwt-token", token);
  }
}


