import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComprobantePagosInfoComponent } from './resumen-comprobante-pagos-info.component';

describe('ResumenComprobantePagosInfoComponent', () => {
  let component: ResumenComprobantePagosInfoComponent;
  let fixture: ComponentFixture<ResumenComprobantePagosInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenComprobantePagosInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComprobantePagosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
