import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComprobanteDialogComponent } from './resumen-comprobante-dialog.component';

describe('ResumenComprobanteDialogComponent', () => {
  let component: ResumenComprobanteDialogComponent;
  let fixture: ComponentFixture<ResumenComprobanteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenComprobanteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComprobanteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
