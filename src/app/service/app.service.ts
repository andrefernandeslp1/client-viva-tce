import { Usuario } from './../model/usuario';
import { inject, Injectable, signal } from '@angular/core';
import { JWTTokenService } from './jwttoken.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private jwtTokenService = inject(JWTTokenService);

  public userLogged = signal<any>({});

  private API_URL = 'http://localhost:5201/Authentication';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.userLogged.set(this.jwtTokenService.getUser())
  }

  login(usuario: Usuario, onSuccess?: Function) {
    return this.http.post<any>(this.API_URL + "/login", usuario, { observe: 'response' }).subscribe({
      next: (response => {
        const token = response.body?.token;
        if (token) {
          localStorage.setItem('jwt-token', token);
        }
        this.userLogged.set(this.jwtTokenService.getUser())
        if(onSuccess) onSuccess()
      }),
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
    })
  }

  cadastrar(usuario: Usuario, onSuccess?: Function) {
    return this.http.post<any>(this.API_URL + "/cadastrar", usuario, { observe: 'response' }).subscribe({
      next: (response => {
        this.snackBar.open(`${response.body.nome} foi cadastrado com sucesso` , "", {duration:3000 })
        if(onSuccess) onSuccess()
      }),
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 }),
    })
  }

  logout() {
    localStorage.clear();
    this.userLogged.set({});
  }
}
