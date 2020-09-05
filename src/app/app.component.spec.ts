import { DataService } from './shared/data-service/data.service';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { FeedbackComponent } from './feedback/feedback.component';
import { QuestionComponent } from './question/question.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        AppHeaderComponent,
        FeedbackComponent,
        QuestionComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        DataService
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
