import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';
import { MarcoVRLNComponent } from '../marco-vrln/marco-vrln.component';
import { HomeDiagnosticoComponent } from '../home-diagnostico/home-diagnostico.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,LoginComponent, MarcoVRLNComponent, HomeDiagnosticoComponent,
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
