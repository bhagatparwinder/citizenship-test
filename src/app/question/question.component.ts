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
  private selectedChoice;

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
    this.selectedChoice = null;
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
    this.selectedChoice = $event.target.closest('.answer').dataset['answerId'];
    const isCorrectAnswer = this.question.correctChoices.indexOf(this.selectedChoice) >= 0;
    this.dataService.updateResults({id: this.question.id, isCorrectAnswer, selectedChoice: this.selectedChoice});
  }

  isSelected(answerId) {
    return answerId === (this.question.selectedChoice || this.selectedChoice);
  }

  isIncorrect(answerId) {
    return this.isSelected(answerId) && this.question.correctChoices.indexOf(answerId) < 0;
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
