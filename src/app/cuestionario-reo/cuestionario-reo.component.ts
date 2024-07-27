import { Component,OnInit } from "@angular/core";
import {CuestionarioReoService} from "./cuestionario-reo-service";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent} from '../footer/footer.component'
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-cuestionario-reo',
    standalone: true,
    imports: [CommonModule,NavbarComponent, FooterComponent, RouterLink],
    templateUrl:'./cuestionario-reo.component.html',
    styleUrl:'./cuestionario-reo.component.css'
})
export class CuestionarioReoComponent implements OnInit {

    questions: any[] = [];
    currentQuestionIndex: number = 0;
    value: string = "";
    arrayData: Array<number> = [];
    
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
            this.arrayData.push(Number(this.value));
        }else{
            this.arrayData.push(Number(this.value));
        }
    }

    onRadioChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement) {
          this.value = inputElement.value;
        }
    }

    finishQuestion(){
        this.nextQuestion() 
        sessionStorage.setItem('dataForm', JSON.stringify(this.arrayData));       
    }


}
