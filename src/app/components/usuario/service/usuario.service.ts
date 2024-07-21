import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  roles = ['cliente', 'vendedor', 'admin'];

  constructor() { }
}
