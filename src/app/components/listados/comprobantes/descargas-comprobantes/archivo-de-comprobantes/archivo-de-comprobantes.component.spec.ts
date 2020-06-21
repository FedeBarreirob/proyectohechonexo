import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoDeComprobantesComponent } from './archivo-de-comprobantes.component';

describe('ArchivoDeComprobantesComponent', () => {
  let component: ArchivoDeComprobantesComponent;
  let fixture: ComponentFixture<ArchivoDeComprobantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivoDeComprobantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoDeComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
