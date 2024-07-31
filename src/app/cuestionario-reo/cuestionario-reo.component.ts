import { Component,OnInit } from "@angular/core";
import { NgModule } from '@angular/core';
import {CuestionarioReoService} from "./cuestionario-reo-service";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent} from '../footer/footer.component'
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';

declare const Swal: any;  // Declarar Swal para TypeScript

@Component({
    selector:'app-cuestionario-reo',
    standalone: true,
    imports: [CommonModule,NavbarComponent, FooterComponent, RouterLink],
    templateUrl:'./cuestionario-reo.component.html',
    styleUrl:'./cuestionario-reo.component.css'
})
export class CuestionarioReoComponent implements OnInit {


  
    contextoVisible:boolean = false; //bandera ws

    questions: any[] = [];
    currentQuestionIndex: number = 0;
    value: string = "";
    arrayData: Array<number> = [];
    selectedOptionIndex: number | null = null;
    showWarning: boolean = false;
    showPreviousResponse = false; // mostrar la respuesta anterior
    previousResponse = ''; // respuesta anterior
    
    constructor(private quizService: CuestionarioReoService,private router: Router) { 
  
    }

  

    ngOnInit(): void {
        this.questions = this.quizService.getQuestions();
        console.log(this.questions);
        this.showWarning = false;
    }

    get progress() {
        return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
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
    hasCompletedQuestionnaire(): boolean {
        return this.currentQuestionIndex === this.questions.length - 1 && this.arrayData.length === this.questions.length;
      }

    finishQuestion(){
      if (this.currentQuestionIndex === this.questions.length - 1 && this.selectedOptionIndex !== null) {
        this.nextQuestion();
        sessionStorage.setItem('dataFormCuestionarioReo', JSON.stringify(this.arrayData));
        // Si se han respondido todas las preguntas, muestra un mensaje de éxito
       
       //Remplazar el alert
        //alert('¡Formulario enviado con éxito!');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "¡Formulario enviado con éxito!",
          showConfirmButton: false,
          timer: 1800
        }); 

        this.router.navigate(['/esquema-reo']);
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
