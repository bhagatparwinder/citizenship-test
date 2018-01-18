import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  data: any = {
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
  };

  constructor() { }

  ngOnInit() {
  }

}
