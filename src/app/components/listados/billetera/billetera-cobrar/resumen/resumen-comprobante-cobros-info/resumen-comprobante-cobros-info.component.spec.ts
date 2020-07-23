import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComprobanteCobrosInfoComponent } from './resumen-comprobante-cobros-info.component';

describe('ResumenComprobanteCobrosInfoComponent', () => {
  let component: ResumenComprobanteCobrosInfoComponent;
  let fixture: ComponentFixture<ResumenComprobanteCobrosInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenComprobanteCobrosInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComprobanteCobrosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
