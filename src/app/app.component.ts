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

    // let token = "" // COMENTAR QUANDO ESTIVER EM PRODUÇÃO

    // ADMIN
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibm9tZSI6IkpvaG4gQWRtaW5pc3RyYWRvciIsImVtYWlsIjoidmVuZGVkb3JAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyMn0.1vCVraALC9hbRi-E5QCDlRp-FHZ8pKPtTVuHGdDpDnA" // COMENTAR QUANDO ESTIVER EM PRODUÇÃO

    // VENDEDOR
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibm9tZSI6IkpvaG4gVmVuZGVkb3IiLCJlbWFpbCI6InZlbmRlZG9yQGdtYWlsLmNvbSIsInJvbGUiOiJ2ZW5kZWRvciIsImZvcm5lY2Vkb3JJZCI6IjAiLCJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.4O6SbWYLSzptXLcwSKnyajPvU34CYY4zQMN-uB-SRcQ" // COMENTAR QUANDO ESTIVER EM PRODUÇÃO


    // *** DESCOMENTAR QUANDO ESTIVER EM PRODUÇÃO ***
    // const token = localStorage.getItem("jwt-token"); // VERIFICA SE EXISTE UM TOKEN NO LOCAL STORAGE E O UTILIZA

    if (token) {
      localStorage.setItem("jwt-token", token); // COMENTAR QUANDO ESTIVER EM PRODUÇÃO
      try{
        this.printDecodedToken(token);
        this.setLocalStorage(token);
      }
      catch(error) {
        console.log(error)
      }
    }
  }

  printDecodedToken(token: string) {
    let decodedToken = jwtDecode<JwtPayload & {id: number; nome: string; email: string; role: string; fornecedorId?: number}>(token);
    console.log(decodedToken)
    console.log(decodedToken.id)
    console.log(decodedToken.nome)
    console.log(decodedToken.email)
    console.log(decodedToken.role)
    console.log(decodedToken.fornecedorId)
  }

  setLocalStorage(token: string) {
    let decodedToken = jwtDecode<JwtPayload & {id: number; nome: string; email: string; role: string; fornecedorId?: number}>(token);
    localStorage.setItem('usuarioId', decodedToken.id.toString());
    localStorage.setItem('nome', decodedToken.nome);
    localStorage.setItem('email', decodedToken.email);
    localStorage.setItem('role', decodedToken.role);
    let fornecedorId = decodedToken.fornecedorId?.toString();
    if(fornecedorId) {
      localStorage.setItem('fornecedorId', fornecedorId);
    }
  }

}


