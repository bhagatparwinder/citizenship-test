import {
  animate,
  keyframes,
  style,
  transition,
  trigger
  } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
    trigger('changeQuestionState', [
      transition('start-prev => finish', [
        animate('0.6s', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(100%)', opacity: 0.1, offset: 0.49}),
          style({opacity: 0, offset: 0.5}),
          style({transform: 'translateX(-100%)', offset: 0.51}),
          style({opacity: 0.1, offset: 0.52}),
          style({transform: 'translateX(0)', opacity: 1, offset: 1.0})
        ]))
      ]),
      transition('start-next => finish', [
        animate('0.6s', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(-100%)',  opacity: 0.1, offset: 0.49}),
          style({opacity: 0, offset: 0.5}),
          style({transform: 'translateX(100%)', offset: 0.51}),
          style({opacity: 0.1, offset: 0.52}),
          style({transform: 'translateX(0)', opacity: 1, offset: 1.0})
        ]))
      ]),

    ])
  ]
})
export class QuestionComponent implements OnInit {
  public question: any;
  public isLast: boolean;
  private selectedChoice;
  public _currentQuestionChangeState = 'start';

  constructor(private dataService: DataService,
    private cd: ChangeDetectorRef) {
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
    this.currentQuestionChangeState = 'finish';
  }

  set currentQuestionChangeState(newState) {
    this._currentQuestionChangeState = newState;
    this.cd.detectChanges();
  }
  get currentQuestionChangeState() {
    return this._currentQuestionChangeState;
  }
  nextQuestion(): void {
    this.currentQuestionChangeState = 'start-next';
    this.dataService.sendQuestion({next: true});
  }

  prevQuestion(): void {
    this.currentQuestionChangeState = 'start-prev';
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
