import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroArchivosComprobantesComponent } from './filtro-archivos-comprobantes.component';

describe('FiltroArchivosComprobantesComponent', () => {
  let component: FiltroArchivosComprobantesComponent;
  let fixture: ComponentFixture<FiltroArchivosComprobantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroArchivosComprobantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroArchivosComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
