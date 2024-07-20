import { UsuarioService } from './../../usuario/service/usuario.service';
import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { FornecedorService } from '../../fornecedor/service/fornecedor.service';
import { Fornecedor } from '../../../model/fornecedor';
import { ServicoService } from '../service/servico.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormArray  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../service/app.service';

@Component({
  selector: 'app-form-servico',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './form-servico.component.html',
  styleUrl: './form-servico.component.css'
})
export class FormServicoComponent {

  form: FormGroup;

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  servicoService = inject(ServicoService);
  fornecedorService = inject(FornecedorService);
  appService = inject(AppService);

  userLogged!: WritableSignal<any>;

  serviceId!: any;
  roles!: string[];
  indexImgArray = 0;

  constructor(private route: ActivatedRoute) {
    this.userLogged = this.appService.userLogged;
    this.form = this.formBuilder.group({
      nome: [null],
      descricao: [null],
      preco: [null],
      imagens: this.formBuilder.array([]),
      fornecedorId: [this.userLogged().fornecedorId],
    });
  }

  ngOnInit() {
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }

  onAdd() {
    this.servicoService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/servico']);
    });
  }

  onEdit(id: any, servico : any) {
    this.servicoService.update(id, servico).subscribe(() => {
      this.router.navigate(['/servico']);
    });
  }

  // form array de imagens
  get imagensArray() {
    return this.form.get('imagens') as FormArray;
  }
  addImage() {
    this.imagensArray.push(this.formBuilder.control('', Validators.required));
  }
  removeImage(index: number) {
    this.imagensArray.removeAt(index);
  }
}
