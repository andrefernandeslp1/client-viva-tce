import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { UsuarioService } from '../../../service/usuario.service';
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { Usuario } from '../../../model/usuario';
import { TituloComponent } from "../../titulo/titulo.component";
import { NgxMaskDirective } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    NgxMaskDirective
],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {

  form: FormGroup;

  usuarioService = inject(UsuarioService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  appService = inject(AppService)

  private snackBar = inject(MatSnackBar)

  fornecedorService = inject(FornecedorService);

  fornecedores!: WritableSignal<Fornecedor[]>;

  roles!: string[];
  usuarioId: string | null;
  userLogged: WritableSignal<Usuario>;

  constructor() {
    this.userLogged = this.appService.userLogged
    this.usuarioId = this.route.snapshot.paramMap.get('id')
    this.form = this.formBuilder.group({
      id: [this.usuarioId??0],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      role: [null, Validators.required],
      fornecedorId: [null],
      senha: [null, Validators.required],
      telefone: [null, Validators.required]
    });
    this.roles = this.usuarioService.roles;
    this.fornecedores = this.fornecedorService.fornecedores;
   }

  ngOnInit() {
    this.listarFornecedores();
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    this.getUserById();
  }

  listarFornecedores() {
    this.fornecedorService.list().subscribe(fornecedores => {
      this.fornecedores.set(fornecedores);
    });
  }

  onAdd() {
    if(this.form.valid) {
      this.usuarioService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/viva-tce/usuarios']);
      });
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
  }

  onEdit(id: any, usuario: Usuario) {
    if(this.form.valid) {
      if(this.userLogged().id.toString() === this.usuarioId )
        this.appService.login(this.form.value, () => this.editar(id,usuario))
      else
        this.editar(id,usuario)
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
  }

  editar(id: any, usuario: Usuario) {
    id = parseInt(id)
    this.usuarioService.update(id, usuario).subscribe(() => {
      if(id == this.userLogged().id){
        this.userLogged.set(this.form.value)
      }
      if(this.userLogged().role === 'admin') {
        this.router.navigate(['/viva-tce/usuarios']);
      } else {
        this.router.navigate(['/viva-tce']);
      }
    });
  }

  getUserById() {
    if(this.usuarioId) {
      this.usuarioService.getOne(parseInt(this.usuarioId)).subscribe(usuario => {
        this.form.patchValue(usuario);
      });
    }
  }


}
