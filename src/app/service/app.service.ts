import { Usuario } from './../model/usuario';
import { inject, Injectable, signal } from '@angular/core';
import { JWTTokenService } from './jwttoken.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  jwtTokenService = inject(JWTTokenService);

  userLogged = signal<any>({});

  public API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      this.userLogged().id = this.jwtTokenService.getUserId();
      this.userLogged().nome = this.jwtTokenService.getUser();
      this.userLogged().email = this.jwtTokenService.getEmail();
      this.userLogged().role = this.jwtTokenService.getRole();
      if(this.userLogged().role == 'vendedor') {
        this.userLogged().fornecedorId = localStorage.getItem('fornecedorId');
      }
    }
    else {
      this.userLogged.set({
        id: 0,
        nome: '',
        email: '',
        role: '',
        // fornecedorId: 0
    });
   }
  }

  setLocalStorage(user: any): void {
    localStorage.setItem('usuarioId', user.id);
    localStorage.setItem('nome', user.nome);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    if(localStorage.getItem('role') == 'vendedor') {
      localStorage.setItem('fornecedorId', user.fornecedorId);
    }
  }

  signup(usuario: Usuario): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>(this.API_URL + "/signup", usuario, { observe: 'response' }).pipe(
      tap(response => {

        const token = response.body?.accessToken;
        if (token) {
          localStorage.setItem('jwt-token', token);
        }
        const usuario = response.body?.usuario;
        if(usuario) {
          this.setLocalStorage(response.body.usuario);
        }
      })
    );
  }

  signin(usuario: Usuario): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.API_URL + "/signin", usuario, { observe: 'response' }).pipe(
      tap(response => {

        const token = response.body?.accessToken;
        if (token) {
          localStorage.setItem('jwt-token', token);
        }
        const usuario = response.body?.usuario;
        if(usuario) {
          this.setLocalStorage(response.body.usuario);
        }

      })
    );
  }


}
