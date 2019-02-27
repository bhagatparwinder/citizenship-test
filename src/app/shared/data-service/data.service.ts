import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private questionsSubject = new Subject<any>();
  private resultSubject = new Subject<any>();

  private currentQuestion = -1;
  private isCurrentSelectionTrue: boolean;
  private correctTotal = 0;
  private incorrectTotal = 0;
  private questions: any;
  private attemptedQuestions = {};

  constructor(private http: HttpClient) {
    this.http.get('assets/data.json')
      .subscribe((data) => {
        this.questions = data['questions'];
        this.sendQuestion({next: true});
        this.sendNewResult();
      });
  }
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

  public updateResults({id, isCorrectAnswer, selectedChoice}): void {
    this.attemptedQuestions[id] = isCorrectAnswer;
    this.isCurrentSelectionTrue = isCorrectAnswer;
    this.correctTotal = Object.keys(this.attemptedQuestions)
                            .filter(key => {
                              return this.attemptedQuestions[key] === true;
                            })
                            .length;
    this.incorrectTotal = Object.keys(this.attemptedQuestions).length - this.correctTotal;
    this.questions.find(question => question.id === id)['selectedChoice'] = selectedChoice;
    this.sendNewResult();
  }
}
