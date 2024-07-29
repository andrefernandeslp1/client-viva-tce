import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from "../../titulo/titulo.component";
import { NgxMaskDirective } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-fornecedor',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    NgxMaskDirective
],
  templateUrl: './form-fornecedor.component.html',
  styleUrl: './form-fornecedor.component.css'
})
export class FormFornecedorComponent implements OnInit {

  form: FormGroup;

  fornecedorService = inject(FornecedorService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  fornecedores!: WritableSignal<Fornecedor[]>;

  fornecedorId: string | null;

  constructor() {
    this.fornecedorId = this.route.snapshot.paramMap.get('id')
    this.form = this.formBuilder.group({
      id: [this.fornecedorId??0],
      nome: [null, Validators.required],
      contato: [null, Validators.required],
      logo: [null, Validators.required]
    });
    this.fornecedores = this.fornecedorService.fornecedores;
  }

  ngOnInit(): void {
    if(this.fornecedorId) {
      this.fornecedorService.getOne(parseInt(this.fornecedorId)).subscribe((data) => {
        this.form.patchValue(data)
      })
    }
  }

  onAdd() {
    if(this.form.valid){
      this.fornecedorService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/viva-tce/fornecedores']);
      });
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
  }

  onEdit() {
    if(this.form.valid){
      const id = this.route.snapshot.paramMap.get('id')
      this.fornecedorService.update(id, this.form.value).subscribe(() => {
        this.router.navigate(['/viva-tce/fornecedores']);
      });
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
  }

}
