import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesTotalComponent } from './solicitudes-total.component';

describe('SolicitudesTotalComponent', () => {
  let component: SolicitudesTotalComponent;
  let fixture: ComponentFixture<SolicitudesTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
