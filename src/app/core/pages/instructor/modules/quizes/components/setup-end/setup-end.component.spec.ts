import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupEndComponent } from './setup-end.component';

describe('SetupEndComponent', () => {
  let component: SetupEndComponent;
  let fixture: ComponentFixture<SetupEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupEndComponent]
    });
    fixture = TestBed.createComponent(SetupEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
