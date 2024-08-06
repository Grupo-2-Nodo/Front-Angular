import { Component,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {CirculoDoradoService} from './circulo-dorado-service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

declare const Swal: any;  // Declarar Swal para TypeScript


@Component({
  selector: 'app-circulo-dorado',
  standalone: true,
  imports: [NavbarComponent,CommonModule ,FooterComponent],
  templateUrl: './circulo-dorado.component.html',
  styleUrl: './circulo-dorado.component.css'
})
export class CirculoDoradoComponent  implements OnInit{

   contextoVisible:boolean = false; //bandera ws

    cambiarVistaInfoCirculo = () => {
      this.contextoVisible = !this.contextoVisible;
    }




    questions: any[] = [];
    currentQuestionIndex: number = 0;
    value: string = "";
    arrayData: Array<number> = [];
    selectedOptionIndex: number | null = null;
    showWarning: boolean = false;
    showPreviousResponse = false; // mostrar la respuesta anterior
    previousResponse = ''; // respuesta anterior


    constructor(private quizService: CirculoDoradoService, private router: Router) { 

    }


    ngOnInit(): void {
      this.questions = this.quizService.getQuestions();
      console.log(this.questions);
      this.showWarning = false;
  }

  get progress() {
      return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  selectOption(index: number) {
    this.selectedOptionIndex = index;
    this.showWarning = false;
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showWarning = false;
      }
  }

  nextQuestion() {
    console.log('Seleccionaste : ' + this.value);
      if (this.selectedOptionIndex !== null && this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.selectedOptionIndex = null;
          this.showWarning = false;
          this.arrayData.push(Number(this.value));
      }else{
          this.arrayData.push(Number(this.value));
          this.showWarning = true;
      }
  }

  goPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showPreviousResponse = true;
    }
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.value = inputElement.value;
      this.selectedOptionIndex = parseInt(inputElement.value) - 1;
    }
}

  finishQuestion(){
    if (this.currentQuestionIndex === this.questions.length - 1 && this.selectedOptionIndex !== null) {
      this.nextQuestion();
        sessionStorage.setItem('dataFormCirculoDorado', JSON.stringify(this.arrayData));
      // Si se han respondido todas las preguntas, muestra un mensaje de éxito
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Formulario enviado con éxito!",
        showConfirmButton: false,
        timer: 1800
      });    
      this.router.navigate(['/res-circulo-dorado']);     
    } else {
      // Si no se han respondido todas las preguntas, muestra un mensaje de error
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Ingrese los datos obligatorios!",
        showConfirmButton: false,
        timer: 1800
      }); 
    }
  }
}
