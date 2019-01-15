import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosMovimientosComponent } from './otros-movimientos.component';

describe('OtrosMovimientosComponent', () => {
  let component: OtrosMovimientosComponent;
  let fixture: ComponentFixture<OtrosMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
