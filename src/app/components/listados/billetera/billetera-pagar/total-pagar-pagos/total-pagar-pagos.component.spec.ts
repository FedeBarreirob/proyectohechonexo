import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPagarPagosComponent } from './total-pagar-pagos.component';

describe('TotalPagarPagosComponent', () => {
  let component: TotalPagarPagosComponent;
  let fixture: ComponentFixture<TotalPagarPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPagarPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPagarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
