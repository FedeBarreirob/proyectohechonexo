import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTotalPagoInfoComponent } from './resumen-total-pago-info.component';

describe('ResumenTotalPagoInfoComponent', () => {
  let component: ResumenTotalPagoInfoComponent;
  let fixture: ComponentFixture<ResumenTotalPagoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenTotalPagoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenTotalPagoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
