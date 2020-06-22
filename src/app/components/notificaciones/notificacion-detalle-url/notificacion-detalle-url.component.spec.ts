import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionDetalleUrlComponent } from './notificacion-detalle-url.component';

describe('NotificacionDetalleUrlComponent', () => {
  let component: NotificacionDetalleUrlComponent;
  let fixture: ComponentFixture<NotificacionDetalleUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionDetalleUrlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionDetalleUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
