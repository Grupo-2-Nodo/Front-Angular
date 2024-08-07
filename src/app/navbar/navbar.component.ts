import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarcoVRLNComponent } from '../marco-vrln/marco-vrln.component';
import { HomeDiagnosticoComponent } from '../home-diagnostico/home-diagnostico.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, MarcoVRLNComponent, HomeDiagnosticoComponent, CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
