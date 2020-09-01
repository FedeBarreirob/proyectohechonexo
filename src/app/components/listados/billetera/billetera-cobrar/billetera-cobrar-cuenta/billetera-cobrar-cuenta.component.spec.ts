import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarCuentaComponent } from './billetera-cobrar-cuenta.component';

describe('BilleteraCobrarCuentaComponent', () => {
  let component: BilleteraCobrarCuentaComponent;
  let fixture: ComponentFixture<BilleteraCobrarCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
