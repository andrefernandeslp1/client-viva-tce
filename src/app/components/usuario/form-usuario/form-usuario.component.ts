import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { UsuarioService } from '../service/usuario.service';
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../fornecedor/service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule,
    ReactiveFormsModule
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

  fornecedorService = inject(FornecedorService);

  fornecedores!: WritableSignal<Fornecedor[]>;

  roles!: string[];
  usuarioId: any;

  constructor() {
    this.form = this.formBuilder.group({
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
    this.usuarioService.update(id, usuario).subscribe(() => {
      this.router.navigate(['/viva-tce/usuarios']);
    });
  }
}
