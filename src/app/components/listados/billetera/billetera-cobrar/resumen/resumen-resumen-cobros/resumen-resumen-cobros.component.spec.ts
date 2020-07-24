import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenResumenCobrosComponent } from './resumen-resumen-cobros.component';

describe('ResumenResumenCobrosComponent', () => {
  let component: ResumenResumenCobrosComponent;
  let fixture: ComponentFixture<ResumenResumenCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenResumenCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenResumenCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
