
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { ServicoService } from '../../../service/servico.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormArray  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../service/app.service';
import { FormsModule } from '@angular/forms';
import { TituloComponent } from "../../titulo/titulo.component";
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-servico',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    TituloComponent,
    NgxMaskDirective
],
  templateUrl: './form-servico.component.html',
  styleUrl: './form-servico.component.css'
})
export class FormServicoComponent implements OnInit {

  form: FormGroup;

  private snackBar = inject(MatSnackBar)

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  servicoService = inject(ServicoService);
  appService = inject(AppService);

  userLogged!: WritableSignal<any>;

  idServico?: string | null;

  constructor(private route: ActivatedRoute) {
    this.idServico = route.snapshot.paramMap.get('id');
    this.userLogged = this.appService.userLogged;
    this.form = this.formBuilder.group({
      id: [this.idServico??0],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      preco: [null, Validators.required],
      imagens: [null, Validators.required],
      fornecedorId: [this.userLogged().fornecedorId]
    });
  }

  ngOnInit() {
    if(this.idServico){
      this.servicoService.getOne(parseInt(this.idServico)).subscribe((data) => {
        this.form.patchValue(data)
        this.imagemArray = data.imagens.split(" ; ")
      })
    }
  }

  onAdd() {
    if(this.form.valid) {
      this.servicoService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/viva-tce']);
      });
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
  }

  onEdit(id: any, servico : any) {
    if(this.form.valid) {
      this.servicoService.update(id, servico).subscribe(() => {
        this.router.navigate(['/viva-tce']);
      });
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
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
    this.form.patchValue({imagens: this.imagemArray.join(" ; ")})
  }
  removerURL(index: number) {
    this.imagemArray.splice(index, 1);
    this.atualizarImagens(this.imagemArray);
  }
}
