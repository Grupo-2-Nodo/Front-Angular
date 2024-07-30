import { Component, OnInit } from '@angular/core';
import { DofaService } from './dofa-service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dofa',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './dofa.component.html',
  styleUrls: ['./dofa.component.css']
})
export class DofaComponent implements OnInit {

  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOptionIndex: number | null = null;
  showWarning: boolean = false;
  showPreviousResponse = false; // mostrar la respuesta anterior
  previousResponse = ''; // respuesta anterior

  constructor(private dofaService: DofaService) { }

  ngOnInit(): void {
    this.questions = this.dofaService.getQuestions();
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
      this.selectedOptionIndex = null;
      this.showWarning = false;
    }
  }

  nextQuestion() {
    if (this.selectedOptionIndex !== null && this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOptionIndex = null;
      this.showWarning = false;
    } else if (this.selectedOptionIndex === null) {
      this.showWarning = true;
    }
  }
  goPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showPreviousResponse = true;
    }
  }
  submitForm() {
    if (this.currentQuestionIndex === this.questions.length - 1 && this.selectedOptionIndex !== null) {
      // Si se han respondido todas las preguntas, muestra un mensaje de éxito
      alert('¡Formulario enviado con éxito!');
    } else {
      // Si no se han respondido todas las preguntas, muestra un mensaje de error
      alert('Por favor, responda todas las preguntas antes de enviar el formulario.');
    }
  }
  }

