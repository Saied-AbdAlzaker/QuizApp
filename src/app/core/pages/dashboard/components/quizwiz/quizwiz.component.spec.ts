import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizwizComponent } from './quizwiz.component';

describe('QuizwizComponent', () => {
  let component: QuizwizComponent;
  let fixture: ComponentFixture<QuizwizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizwizComponent]
    });
    fixture = TestBed.createComponent(QuizwizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
