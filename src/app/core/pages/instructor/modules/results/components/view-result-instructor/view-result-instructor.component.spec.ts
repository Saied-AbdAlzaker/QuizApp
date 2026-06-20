import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultInstructorComponent } from './view-result-instructor.component';

describe('ViewResultInstructorComponent', () => {
  let component: ViewResultInstructorComponent;
  let fixture: ComponentFixture<ViewResultInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewResultInstructorComponent]
    });
    fixture = TestBed.createComponent(ViewResultInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
