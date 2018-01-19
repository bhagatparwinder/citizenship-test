import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  data: any = {
    answer: {
      type: 'Correct',
      symbol: 'check'
    },
    total: 10,
    correct: 7,
    incorrect: 3
  };
  constructor() { }

  ngOnInit() {
  }

}
