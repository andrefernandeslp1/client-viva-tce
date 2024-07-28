import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { UsuarioService } from '../../../service/usuario.service';
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { Usuario } from '../../../model/usuario';
import { TituloComponent } from "../../titulo/titulo.component";

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent
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

  fornecedorService = inject(FornecedorService);

  fornecedores!: WritableSignal<Fornecedor[]>;

  roles!: string[];
  usuarioId: string | null;
  userLogged: WritableSignal<Usuario>;

  constructor() {
    this.userLogged = this.appService.userLogged
    this.usuarioId = this.route.snapshot.paramMap.get('id')
    this.form = this.formBuilder.group({
      id: [this.usuarioId],
      nome: [null],
      email: [null],
      role: [null],
      fornecedorId: [null],
      senha: [null],
      telefone: [null]
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
      console.log(fornecedores);
    });
  }

  onAdd() {
    this.usuarioService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/viva-tce/usuarios']);
    });
  }

  onEdit(id: any, usuario : any) {
    this.appService.login(this.form.value, () => {
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
    })
  }

  getUserById() {
    if(this.usuarioId) {
      this.usuarioService.getOne(parseInt(this.usuarioId)).subscribe(usuario => {
        this.form.patchValue(usuario);
      });
    }
  }


}
