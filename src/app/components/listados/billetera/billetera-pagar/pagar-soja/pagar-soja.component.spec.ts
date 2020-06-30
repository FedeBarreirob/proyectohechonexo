import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarSojaComponent } from './pagar-soja.component';

describe('PagarSojaComponent', () => {
  let component: PagarSojaComponent;
  let fixture: ComponentFixture<PagarSojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarSojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarSojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
