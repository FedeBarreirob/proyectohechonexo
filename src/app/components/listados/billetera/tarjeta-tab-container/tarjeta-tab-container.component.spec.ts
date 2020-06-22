import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTabContainerComponent } from './tarjeta-tab-container.component';

describe('TarjetaTabContainerComponent', () => {
  let component: TarjetaTabContainerComponent;
  let fixture: ComponentFixture<TarjetaTabContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaTabContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
