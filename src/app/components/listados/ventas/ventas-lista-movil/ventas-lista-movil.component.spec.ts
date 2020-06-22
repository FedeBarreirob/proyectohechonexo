import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasListaMovilComponent } from './ventas-lista-movil.component';

describe('VentasListaMovilComponent', () => {
  let component: VentasListaMovilComponent;
  let fixture: ComponentFixture<VentasListaMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasListaMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasListaMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
