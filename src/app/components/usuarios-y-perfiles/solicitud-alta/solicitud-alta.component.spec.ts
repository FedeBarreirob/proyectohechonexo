import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAltaComponent } from './solicitud-alta.component';

describe('SolicitudAltaComponent', () => {
  let component: SolicitudAltaComponent;
  let fixture: ComponentFixture<SolicitudAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
