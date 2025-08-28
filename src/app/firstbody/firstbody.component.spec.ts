import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstbodyComponent } from './firstbody.component';

describe('FirstbodyComponent', () => {
  let component: FirstbodyComponent;
  let fixture: ComponentFixture<FirstbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
