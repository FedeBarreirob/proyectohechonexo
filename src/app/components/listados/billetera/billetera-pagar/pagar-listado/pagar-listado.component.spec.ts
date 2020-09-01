import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarListadoComponent } from './pagar-listado.component';

describe('PagarListadoComponent', () => {
  let component: PagarListadoComponent;
  let fixture: ComponentFixture<PagarListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
