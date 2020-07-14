import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgessBarModalComponent } from './progess-bar-modal.component';

describe('ProgessBarModalComponent', () => {
  let component: ProgessBarModalComponent;
  let fixture: ComponentFixture<ProgessBarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgessBarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgessBarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
