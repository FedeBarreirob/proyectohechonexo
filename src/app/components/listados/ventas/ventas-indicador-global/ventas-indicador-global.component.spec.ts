import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasIndicadorGlobalComponent } from './ventas-indicador-global.component';

describe('VentasIndicadorGlobalComponent', () => {
  let component: VentasIndicadorGlobalComponent;
  let fixture: ComponentFixture<VentasIndicadorGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasIndicadorGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasIndicadorGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
