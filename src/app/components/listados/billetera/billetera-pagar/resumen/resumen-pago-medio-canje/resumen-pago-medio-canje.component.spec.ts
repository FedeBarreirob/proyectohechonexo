import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPagoMedioCanjeComponent } from './resumen-pago-medio-canje.component';

describe('ResumenPagoMedioCanjeComponent', () => {
  let component: ResumenPagoMedioCanjeComponent;
  let fixture: ComponentFixture<ResumenPagoMedioCanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenPagoMedioCanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenPagoMedioCanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
