import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarResumenComponent } from './billetera-cobrar-resumen.component';

describe('BilleteraCobrarResumenComponent', () => {
  let component: BilleteraCobrarResumenComponent;
  let fixture: ComponentFixture<BilleteraCobrarResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
