import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraAcobrarResumenItemComponent } from './billetera-acobrar-resumen-item.component';

describe('BilleteraAcobrarResumenItemComponent', () => {
  let component: BilleteraAcobrarResumenItemComponent;
  let fixture: ComponentFixture<BilleteraAcobrarResumenItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraAcobrarResumenItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraAcobrarResumenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
