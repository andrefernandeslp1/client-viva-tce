import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {LocalStorageService} from "./local-storage.service";
import { Usuario } from '../model/usuario';
// import {AppCookieService} from "./app-cookie.service";

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  constructor(private authStorageService: LocalStorageService)
  {
  }

  getUser(): Usuario | null {
    const jwtToken = this.authStorageService.get("jwt-token");
    if(jwtToken){
      const decodedToken: Usuario & JwtPayload = jwtDecode(jwtToken)
      if(decodedToken){
        const usuario = {
          id: decodedToken.id,
          nome: decodedToken.nome,
          email: decodedToken.email,
          role: decodedToken.role,
          fornecedorId: decodedToken.fornecedorId
        };
        return usuario;
      }
    }
    
    return null;
  }
}
