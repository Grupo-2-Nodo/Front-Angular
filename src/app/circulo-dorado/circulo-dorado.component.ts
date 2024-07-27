import { Component,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {CirculoDoradoService} from './circulo-dorado-service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


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


    constructor(private quizService: CirculoDoradoService) { 

    }


    ngOnInit(): void {
      this.questions = this.quizService.getQuestions();
      console.log(this.questions);
  }

  get progress() {
      return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  prevQuestion() {
      if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      }
  }

  nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      }
  }
}
