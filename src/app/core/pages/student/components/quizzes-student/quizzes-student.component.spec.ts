import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesStudentComponent } from './quizzes-student.component';

describe('QuizzesStudentComponent', () => {
  let component: QuizzesStudentComponent;
  let fixture: ComponentFixture<QuizzesStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesStudentComponent]
    });
    fixture = TestBed.createComponent(QuizzesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
