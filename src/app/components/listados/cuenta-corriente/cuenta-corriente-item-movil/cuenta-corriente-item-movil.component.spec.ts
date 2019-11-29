import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteItemMovilComponent } from './cuenta-corriente-item-movil.component';

describe('CuentaCorrienteItemMovilComponent', () => {
  let component: CuentaCorrienteItemMovilComponent;
  let fixture: ComponentFixture<CuentaCorrienteItemMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteItemMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteItemMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
