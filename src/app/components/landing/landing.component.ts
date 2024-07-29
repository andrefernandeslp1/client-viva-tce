import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../service/app.service';
import { Location } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  logoTce = "./assets/tce.jpg"

  isLogin = true

  cadastroForm: FormGroup = this.formBuilder.group({
    nome: [null, Validators.required],
    email: [null, Validators.required],
    senha: [null, Validators.required],
    telefone: [null, Validators.required],
    role: ['cliente']
  });
  loginForm: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
    senha: [null, Validators.required],
  });

  service = inject(AppService);
  router = inject(Router);

  constructor(private snackBar:MatSnackBar, private formBuilder: FormBuilder)
  {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      telefone: [null, Validators.required],
      role: ['cliente']
    });
  }

  select(){
    this.isLogin = !this.isLogin
  }

  login() {
    if(this.loginForm.valid) {
      this.service.login(this.loginForm.value, () => {
        this.router.navigate(['../viva-tce'])
      })
    } else {
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
    }
  }

  cadastrar() {
    if(this.cadastroForm.valid)
      this.service.cadastrar(this.cadastroForm.value, () => {this.isLogin = true})
    else
      this.snackBar.open('Preencha os campos vazios.', '', {duration: 3000})
  }

}
