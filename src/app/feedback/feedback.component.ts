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
    try {
      this.dataService.getResultSubject().subscribe((data) => this.handleResultUpdate(data));
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.dataService.sendNewResult();
  }

  handleResultUpdate(data) {
    this.data = data;
  }

}
