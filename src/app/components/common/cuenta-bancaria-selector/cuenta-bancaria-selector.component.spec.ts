import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaSelectorComponent } from './cuenta-bancaria-selector.component';

describe('CuentaBancariaSelectorComponent', () => {
  let component: CuentaBancariaSelectorComponent;
  let fixture: ComponentFixture<CuentaBancariaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaBancariaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaBancariaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
