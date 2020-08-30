import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalloRecuperacionPasswordCardComponent } from './fallo-recuperacion-password-card.component';

describe('FalloRecuperacionPasswordCardComponent', () => {
  let component: FalloRecuperacionPasswordCardComponent;
  let fixture: ComponentFixture<FalloRecuperacionPasswordCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalloRecuperacionPasswordCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalloRecuperacionPasswordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
