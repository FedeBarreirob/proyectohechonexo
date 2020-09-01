import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTabContainerWeb1Component } from './tarjeta-tab-container-web1.component';

describe('TarjetaTabContainerWeb1Component', () => {
  let component: TarjetaTabContainerWeb1Component;
  let fixture: ComponentFixture<TarjetaTabContainerWeb1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaTabContainerWeb1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTabContainerWeb1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
