import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
