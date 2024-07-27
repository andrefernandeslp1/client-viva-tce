import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  logoTce = "./assets/tce.jpg"

  isLogin = true

  form: FormGroup;

  service = inject(AppService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  constructor(private snackBar:MatSnackBar)
  {
    this.form = this.formBuilder.group({
      nome: [null],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      telefone: [null],
      role: ['cliente']
    });
  }

  select(){
    this.isLogin = !this.isLogin
  }

  login() {
    if(this.form.valid) this.service.login(this.form.value, () => {this.router.navigate(['viva-tce'])})
  }

  cadastrar() {
    this.service.cadastrar(this.form.value, () => {this.isLogin = true})
  }

}
