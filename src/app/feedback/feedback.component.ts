import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data-service/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  data: any = {};
  constructor(private dataService: DataService) {
    this.data = this.initData();
    try {
      this.dataService.getResultSubject().subscribe((data) => this.handleResultUpdate(data));
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
  }

  handleResultUpdate(data) {
    this.data = data;
  }

  initData(): any {
    return {
      isCurrentSelectionTrue: false,
      correctTotal: 0,
      incorrectTotal: 0,
      total: 0
    };
  }

}
