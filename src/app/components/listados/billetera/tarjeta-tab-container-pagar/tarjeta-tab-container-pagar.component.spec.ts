import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTabContainerPagarComponent } from './tarjeta-tab-container-pagar.component';

describe('TarjetaTabContainerPagarComponent', () => {
  let component: TarjetaTabContainerPagarComponent;
  let fixture: ComponentFixture<TarjetaTabContainerPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaTabContainerPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTabContainerPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
