import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionModalComponent } from './exception-modal.component';

describe('ExceptionModalComponent', () => {
  let component: ExceptionModalComponent;
  let fixture: ComponentFixture<ExceptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
