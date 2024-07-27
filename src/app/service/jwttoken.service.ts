import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {LocalStorageService} from "./local-storage.service";
import { Usuario } from '../model/usuario';
// import {AppCookieService} from "./app-cookie.service";

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: string | null;
  decodedToken?: JwtPayload & Usuario;

  constructor(private authStorageService: LocalStorageService)
  {
    this.jwtToken = this.authStorageService.get("jwt-token");
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken)
    }
  }

  getNome() {
    console.log(this.decodedToken);
    return this.decodedToken ? this.decodedToken.nome : null;
  }

  getEmail() {
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getRole() {
    return this.decodedToken ? this.decodedToken.role : null;
  }

  getUserId() {
    return this.decodedToken ? this.decodedToken.id : null;
  }

  getUserFornecedor() {
    return this.decodedToken ? this.decodedToken.fornecedorId : null;
  }

  getUser(): Usuario | null {
    if(this.decodedToken){
      const usuario = {
        id: this.decodedToken.id,
        nome: this.decodedToken.nome,
        email: this.decodedToken.email,
        role: this.decodedToken.role,
        fornecedorId: this.decodedToken.fornecedorId
      };
      return usuario;
    }
    return null;
  }
}
