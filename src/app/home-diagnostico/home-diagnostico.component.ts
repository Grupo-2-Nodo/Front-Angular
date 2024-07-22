import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router'; 
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home-diagnostico',
  standalone: true,
  imports: [NavbarComponent,RouterLink, FooterComponent],
  templateUrl: './home-diagnostico.component.html',
  styleUrl: './home-diagnostico.component.css'
})
export class HomeDiagnosticoComponent {

}
