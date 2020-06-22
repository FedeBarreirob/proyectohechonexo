import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosMovimientosMasOperacionesComponent } from './otros-movimientos-mas-operaciones.component';

describe('OtrosMovimientosMasOperacionesComponent', () => {
  let component: OtrosMovimientosMasOperacionesComponent;
  let fixture: ComponentFixture<OtrosMovimientosMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosMovimientosMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosMovimientosMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
