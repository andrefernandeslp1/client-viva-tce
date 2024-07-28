import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { MenuComponent } from "../../menu/menu.component";
import { Fornecedor } from '../../../model/fornecedor';
import { FornecedorService } from '../../../service/fornecedor.service';
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
export class FormFornecedorComponent implements OnInit {

  form: FormGroup;

  fornecedorService = inject(FornecedorService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  fornecedores!: WritableSignal<Fornecedor[]>;

  fornecedorId: string | null;

  constructor() {
    this.fornecedorId = this.route.snapshot.paramMap.get('id')
    this.form = this.formBuilder.group({
      id: [this.fornecedorId],
      nome: [null],
      contato: [null],
      logo: [null]
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
    this.fornecedorService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/viva-tce/fornecedores']);
    });
  }

  onEdit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.fornecedorService.update(id, this.form.value).subscribe(() => {
      this.router.navigate(['/viva-tce/fornecedores']);
    });
  }

}
