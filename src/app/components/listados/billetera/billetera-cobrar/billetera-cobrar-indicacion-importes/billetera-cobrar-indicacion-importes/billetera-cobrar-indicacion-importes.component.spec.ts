import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraCobrarIndicacionImportesComponent } from './billetera-cobrar-indicacion-importes.component';

describe('BilleteraCobrarIndicacionImportesComponent', () => {
  let component: BilleteraCobrarIndicacionImportesComponent;
  let fixture: ComponentFixture<BilleteraCobrarIndicacionImportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraCobrarIndicacionImportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraCobrarIndicacionImportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
