import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNotificacionesComponent } from './panel-notificaciones.component';

describe('PanelNotificacionesComponent', () => {
  let component: PanelNotificacionesComponent;
  let fixture: ComponentFixture<PanelNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
