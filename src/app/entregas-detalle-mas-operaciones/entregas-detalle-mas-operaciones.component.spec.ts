import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasDetalleMasOperacionesComponent } from './entregas-detalle-mas-operaciones.component';

describe('EntregasDetalleMasOperacionesComponent', () => {
  let component: EntregasDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<EntregasDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
