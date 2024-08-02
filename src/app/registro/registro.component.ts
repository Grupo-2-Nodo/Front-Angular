import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';  // Importa Router
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private router: Router) {}  // Inyecta Router para navegación

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Usar Swal desde el objeto global
      (window as any).Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Registro con éxito!',
        showConfirmButton: false,
        timer: 2200
      }).then(() => {
        this.router.navigate(['/home-diagnostico']);
      });
    } else {
      (window as any).Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ingrese los datos obligatorios!',
        showConfirmButton: false,
        timer: 1800
      });
    }
  }
}

  

