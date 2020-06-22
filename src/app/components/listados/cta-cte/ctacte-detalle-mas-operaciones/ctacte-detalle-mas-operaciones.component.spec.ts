import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtacteDetalleMasOperacionesComponent } from './ctacte-detalle-mas-operaciones.component';

describe('CtacteDetalleMasOperacionesComponent', () => {
  let component: CtacteDetalleMasOperacionesComponent;
  let fixture: ComponentFixture<CtacteDetalleMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtacteDetalleMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtacteDetalleMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
