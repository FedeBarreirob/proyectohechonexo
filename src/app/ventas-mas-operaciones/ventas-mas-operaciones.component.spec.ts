import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasMasOperacionesComponent } from './ventas-mas-operaciones.component';

describe('VentasMasOperacionesComponent', () => {
  let component: VentasMasOperacionesComponent;
  let fixture: ComponentFixture<VentasMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
