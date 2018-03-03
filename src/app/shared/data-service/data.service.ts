import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {
  private questionsSubject = new Subject<any>();
  private resultSubject = new Subject<any>();
  private currentQuestion = 0;
  private isCurrentSelectionTrue: boolean;
  private correctTotal = 0;
  private incorrectTotal = 0;
  private questions: any = this.initQuestions();

  public getQuestionSubject(): Observable<any> {
    return this.questionsSubject.asObservable();
  }

  public sendNewQuestion(): void {
    this.questionsSubject.next({
      question: this.questions[this.currentQuestion++],
      isLast: this.currentQuestion >= this.questions.length
    });
  }

  private initQuestions(): Object {
    return [
      {
        order: 1,
        desc: 'Name one U.S. territory?',
        choices: [{
                id: 'A',
                desc: 'Bermuda'
            },
            {
                id: 'B',
                desc: 'Guam'
            },
            {
                id: 'C',
                desc: 'Cayman Islands'
            },
            {
                id: 'D',
                desc: 'Haiti'
            }
        ]
      },
      {
        order: 2,
        desc: 'What is the supreme law of the land?',
        choices: [{
                id: 'A',
                desc: 'Constitution'
            },
            {
                id: 'B',
                desc: 'Bill Of Rights'
            },
            {
                id: 'C',
                desc: 'Supreme Court'
            },
            {
                id: 'D',
                desc: 'Declaration of Independence'
            }
        ]
      },
    ];
  }
}
