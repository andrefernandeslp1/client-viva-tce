import { Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-fornecedor',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-fornecedor.component.html',
  styleUrl: './form-fornecedor.component.css'
})
export class FormFornecedorComponent {

  form: FormGroup;

  fornecedorService = inject(FornecedorService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  fornecedores!: WritableSignal<Fornecedor[]>;

  constructor() {
    this.form = this.formBuilder.group({
      nome: [null],
      contato: [null],
      logo: [null]
    });
    this.fornecedores = this.fornecedorService.fornecedores;
  }

  onAdd() {
    this.fornecedorService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/viva-tce/fornecedores']);
    });
  }

  onEdit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.fornecedorService.update(id, this.form.value).subscribe(() => {
      this.router.navigate(['/viva-tce/fornecedores']);
    });
  }

}
