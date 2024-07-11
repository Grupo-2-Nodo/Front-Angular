import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EsquemaReoComponent} from './esquema-reo/esquema-reo.component';
import {CirculoDoradoComponent} from './circulo-dorado/circulo-dorado.component';
import {RegistroComponent} from './registro/registro.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegistroComponent,EsquemaReoComponent,CirculoDoradoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
