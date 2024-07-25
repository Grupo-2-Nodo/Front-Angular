import { Component,OnInit } from "@angular/core";
import {CuestionarioReoService} from "./cuestionario-reo-service";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent} from '../footer/footer.component'

@Component({
    selector:'app-cuestionario-reo',
    standalone: true,
    imports: [CommonModule,NavbarComponent, FooterComponent],
    templateUrl:'./cuestionario-reo.component.html',
    styleUrl:'./cuestionario-reo.component.css'
})
export class CuestionarioReoComponent implements OnInit {

    questions: any[] = [];
    currentQuestionIndex: number = 0;
   
    
    constructor(private quizService: CuestionarioReoService) { 
  
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
