import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarComprobantesTotalComponent } from './pagar-comprobantes-total.component';

describe('PagarComprobantesTotalComponent', () => {
  let component: PagarComprobantesTotalComponent;
  let fixture: ComponentFixture<PagarComprobantesTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarComprobantesTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarComprobantesTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
