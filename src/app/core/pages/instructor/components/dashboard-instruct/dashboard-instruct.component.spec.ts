import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInstructComponent } from './dashboard-instruct.component';

describe('DashboardInstructComponent', () => {
  let component: DashboardInstructComponent;
  let fixture: ComponentFixture<DashboardInstructComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInstructComponent]
    });
    fixture = TestBed.createComponent(DashboardInstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
