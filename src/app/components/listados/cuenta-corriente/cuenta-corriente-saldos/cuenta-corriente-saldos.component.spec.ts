import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteSaldosComponent } from './cuenta-corriente-saldos.component';

describe('CuentaCorrienteSaldosComponent', () => {
  let component: CuentaCorrienteSaldosComponent;
  let fixture: ComponentFixture<CuentaCorrienteSaldosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaCorrienteSaldosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaCorrienteSaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
