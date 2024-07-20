import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-circulo-dorado',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './circulo-dorado.component.html',
  styleUrl: './circulo-dorado.component.css'
})
export class CirculoDoradoComponent {

   contextoVisible:boolean = false; //bandera ws

    cambiarVistaInfoCirculo = () => {
      this.contextoVisible = !this.contextoVisible;
    }
}
