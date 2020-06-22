import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarResumenTotalComponent } from './billetera-cobrar-resumen-total.component';

describe('BilleteraCobrarResumenTotalComponent', () => {
  let component: BilleteraCobrarResumenTotalComponent;
  let fixture: ComponentFixture<BilleteraCobrarResumenTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarResumenTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarResumenTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
