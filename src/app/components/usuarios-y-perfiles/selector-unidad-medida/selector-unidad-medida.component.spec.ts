import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorUnidadMedidaComponent } from './selector-unidad-medida.component';

describe('SelectorUnidadMedidaComponent', () => {
  let component: SelectorUnidadMedidaComponent;
  let fixture: ComponentFixture<SelectorUnidadMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorUnidadMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
