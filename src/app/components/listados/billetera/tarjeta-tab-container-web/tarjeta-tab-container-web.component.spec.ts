import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTabContainerWebComponent } from './tarjeta-tab-container-web.component';

describe('TarjetaTabContainerWebComponent', () => {
  let component: TarjetaTabContainerWebComponent;
  let fixture: ComponentFixture<TarjetaTabContainerWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaTabContainerWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTabContainerWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
