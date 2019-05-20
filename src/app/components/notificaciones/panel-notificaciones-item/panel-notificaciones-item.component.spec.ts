import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNotificacionesItemComponent } from './panel-notificaciones-item.component';

describe('PanelNotificacionesItemComponent', () => {
  let component: PanelNotificacionesItemComponent;
  let fixture: ComponentFixture<PanelNotificacionesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNotificacionesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNotificacionesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
