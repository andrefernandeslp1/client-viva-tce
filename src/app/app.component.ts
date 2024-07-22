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
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibm9tZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.0y88aC-joyJ5LgkInDmS2yXV1Vo9ET6DYPe0lNlMNMQ"

    // VENDEDOR
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwibm9tZSI6IkpvaG4gVmVuZGVkb3IiLCJlbWFpbCI6InZlbmRlZG9yQGdtYWlsLmNvbSIsInJvbGUiOiJ2ZW5kZWRvciIsInN1YiI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.AOHuEZFEith85h8aFDjsnh91aksXI9oBME2kChnU_qU"

    try {
      let decodedToken = jwtDecode<JwtPayload & {id: number; nome: string; email: string; role: string}>(token);
      console.log(decodedToken)
      console.log(decodedToken.id)
      console.log(decodedToken.nome)
      console.log(decodedToken.email)
      console.log(decodedToken.role)
    } catch (error) {
      console.log(error)
    }

    //document.cookie = "jwt-token="+ token;
    localStorage.setItem("jwt-token", token);
  }
}


