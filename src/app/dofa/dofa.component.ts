import { Component, OnInit } from '@angular/core';
import { DofaService } from './dofa-service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

declare const Swal: any;  // Declarar Swal para TypeScript

@Component({
  selector: 'app-dofa',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './dofa.component.html',
  styleUrls: ['./dofa.component.css']
})
export class DofaComponent implements OnInit {

  questions: any[] = [];
  currentQuestionIndex: number = 0;
  arrayData: Array<number> = [];
  value: string = "";
  selectedOptionIndex: number | null = null;
  showWarning: boolean = false;
  showPreviousResponse = false; // mostrar la respuesta anterior
  previousResponse = ''; // respuesta anterior
  

  constructor(private dofaService: DofaService, private router: Router) { }

  ngOnInit(): void {
    this.questions = this.dofaService.getQuestions();
    console.log(this.questions);
    this.showWarning = false;
  }

  get progress() {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
  selectOption(index: number, event: Event) {
    this.selectedOptionIndex = index;
    this.showWarning = false;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.value = inputElement.value;
      this.selectedOptionIndex = parseInt(inputElement.value) - 1;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOptionIndex = null;
      this.showWarning = false;
    }
  }

  nextQuestion() {
    if (this.selectedOptionIndex !== null && this.currentQuestionIndex < this.questions.length - 1) {
      console.log(this.value);
      this.currentQuestionIndex++;
      this.selectedOptionIndex = null;
      this.showWarning = false;
      this.arrayData.push(Number(this.value));
    } else if (this.selectedOptionIndex === null) {
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

  hasCompletedQuestionnaire(): boolean {
      return this.currentQuestionIndex === this.questions.length - 1 && this.arrayData.length === this.questions.length;
  }

  finishQuestion(){
    if (this.currentQuestionIndex === this.questions.length - 1 && this.selectedOptionIndex !== null) {
      this.nextQuestion();
      sessionStorage.setItem('dataFormDofa', JSON.stringify(this.arrayData));
      // Si se han respondido todas las preguntas, muestra un mensaje de éxito
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Formulario enviado con éxito!",
        showConfirmButton: false,
        timer: 1800
      });
      this.router.navigate(['/res-dofa']);        
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

