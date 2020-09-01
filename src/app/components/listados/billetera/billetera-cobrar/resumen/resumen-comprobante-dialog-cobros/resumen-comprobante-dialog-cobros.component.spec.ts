import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComprobanteDialogCobrosComponent } from './resumen-comprobante-dialog-cobros.component';

describe('ResumenComprobanteDialogCobrosComponent', () => {
  let component: ResumenComprobanteDialogCobrosComponent;
  let fixture: ComponentFixture<ResumenComprobanteDialogCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenComprobanteDialogCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComprobanteDialogCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
