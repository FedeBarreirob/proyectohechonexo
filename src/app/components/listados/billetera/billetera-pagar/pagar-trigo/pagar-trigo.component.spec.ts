import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarTrigoComponent } from './pagar-trigo.component';

describe('PagarTrigoComponent', () => {
  let component: PagarTrigoComponent;
  let fixture: ComponentFixture<PagarTrigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarTrigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarTrigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
