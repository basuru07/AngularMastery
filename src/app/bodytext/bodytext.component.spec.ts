import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodytextComponent } from './bodytext.component';

describe('BodytextComponent', () => {
  let component: BodytextComponent;
  let fixture: ComponentFixture<BodytextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodytextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodytextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
