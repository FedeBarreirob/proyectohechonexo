import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasDetalleComponent } from './entregas-detalle.component';

describe('EntregasDetalleComponent', () => {
  let component: EntregasDetalleComponent;
  let fixture: ComponentFixture<EntregasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
