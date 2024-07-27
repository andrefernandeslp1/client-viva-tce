
import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { ServicoService } from '../service/servico.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormArray  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../service/app.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-servico',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './form-servico.component.html',
  styleUrl: './form-servico.component.css'
})
export class FormServicoComponent {

  form: FormGroup;

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  servicoService = inject(ServicoService);
  appService = inject(AppService);

  userLogged!: WritableSignal<any>;

  serviceId!: any;

  constructor(private route: ActivatedRoute) {
    this.userLogged = this.appService.userLogged;
    this.form = this.formBuilder.group({
      nome: [null],
      descricao: [null],
      preco: [null],
      imagens: this.formBuilder.array(['']),
      fornecedorId: [this.userLogged().fornecedorId]
    });
  }

  ngOnInit() {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    console.log(this.userLogged().fornecedorId)
  }

  onAdd() {
    this.servicoService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/viva-tce']);
    });
  }

  onEdit(id: any, servico : any) {
    this.servicoService.update(id, servico).subscribe(() => {
      this.router.navigate(['/viva-tce']);
    });
  }

  imagemURL = '';
  imagemArray: string[] = [];

  addImagem() {
    this.imagemArray.push(this.imagemURL);
    this.atualizarImagens(this.imagemArray);
    this.imagemURL = '';
    console.log(this.form.value);
  }
  atualizarImagens(novasImagens: string[]) {
    const imagensArray = this.formBuilder.array(novasImagens.map(imagem => this.formBuilder.control(imagem)));
    this.form.setControl('imagens', imagensArray);
  }
  removerURL(index: number) {
    this.imagemArray.splice(index, 1);
    this.atualizarImagens(this.imagemArray);
  }
}
