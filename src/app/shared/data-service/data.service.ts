import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {
  private questionsSubject = new Subject<any>();
  private resultSubject = new Subject<any>();

  private currentQuestion = -1;
  private isCurrentSelectionTrue: boolean;
  private correctTotal = 0;
  private incorrectTotal = 0;
  private questions: any = this.initQuestions();
  private attemptedQuestions = {};

  public getQuestionSubject(): Observable<any> {
    return this.questionsSubject.asObservable();
  }

  public sendQuestion({next}): void {
    if (!!next) {
      this.currentQuestion++;
    } else {
      this.currentQuestion--;
    }
    this.questionsSubject.next({
      question: this.questions[this.currentQuestion],
      isLast: this.currentQuestion === this.questions.length - 1
    });
  }
  public getResultSubject(): Observable<any> {
    return this.resultSubject.asObservable();
  }

  public sendNewResult(): void {
    this.resultSubject.next({
      isCurrentSelectionTrue: this.isCurrentSelectionTrue,
      correctTotal: this.correctTotal,
      incorrectTotal: this.incorrectTotal,
      total: this.questions.length
    });
  }

  public updateResults({id, isCorrectAnswer}): void {
    this.attemptedQuestions[id] = isCorrectAnswer;
    this.isCurrentSelectionTrue = isCorrectAnswer;
    this.correctTotal = Object.keys(this.attemptedQuestions)
                            .filter(key => {
                              return this.attemptedQuestions[key] === true;
                            })
                            .length;
    this.incorrectTotal = Object.keys(this.attemptedQuestions).length - this.correctTotal;
    this.sendNewResult();
  }


  private initQuestions(): Object {
    return [
      {
        id: 1,
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
        ],
        correctChoices: 'B'
      },
      {
        id: 2,
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
        ],
        correctChoices: 'A'
      },
      {
        id: 3,
        desc: ' What does the Constitution do?',
        choices: [{
                id: 'A',
                desc: 'Sets up the government'
            },
            {
                id: 'B',
                desc: 'Defines the government'
            },
            {
                id: 'C',
                desc: 'Protects basic rights of Americans'
            },
            {
                id: 'D',
                desc: 'Declaration of Independence'
            }
        ],
        correctChoices: 'ABC'
      },
    ];
  }
}
