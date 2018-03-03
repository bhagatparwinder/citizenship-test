import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public data: any = {};
  public isLast: boolean;

  constructor(private dataService: DataService) {
    try {
      this.dataService.getQuestionSubject().subscribe((data) => this.handleQuestions(data));
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.dataService.sendNewQuestion();
  }

  handleQuestions(data): void {
    this.data = data.question || {};
    this.isLast = data.isLast;
  }

  nextQuestion(): void {
    this.dataService.sendNewQuestion();
  }

}
