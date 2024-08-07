import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

declare const Swal: any;  // Declarar Swal para TypeScript

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule,NavbarComponent, FooterComponent, RouterLink ], 
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1800
      }); 
      this.router.navigate(['/home-diagnostico']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
