import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public question: any;
  public isLast: boolean;

  constructor(private dataService: DataService) {
    this.question = this.initQuestions();
    try {
      this.dataService.getQuestionSubject().subscribe((data) => this.handleQuestions(data));
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
  }

  handleQuestions(data): void {
    this.question = data.question || {};
    this.isLast = data.isLast;
  }

  nextQuestion(): void {
    this.dataService.sendQuestion({next: true});
  }

  prevQuestion(): void {
    this.dataService.sendQuestion({next: false});
  }

  handleAnswerClick($event) {
    const selectedChoice = $event.target.closest('.answer').dataset['answerId'];
    const isCorrectAnswer = this.question.correctChoices.indexOf(selectedChoice) >= 0;
    this.dataService.updateResults({id: this.question.id, isCorrectAnswer});
  }
  private initQuestions(): any {
    return [
      {
        id: '',
        desc: '',
        choices: [{
                id: 'A',
                desc: ''
            },
            {
                id: 'B',
                desc: ''
            },
            {
                id: 'C',
                desc: ''
            },
            {
                id: 'D',
                desc: ''
            }
        ],
        correctChoices: ''
      }
    ];
  }

}
