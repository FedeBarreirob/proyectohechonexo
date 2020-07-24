import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenResumenCobrosItemComponent } from './resumen-resumen-cobros-item.component';

describe('ResumenResumenCobrosItemComponent', () => {
  let component: ResumenResumenCobrosItemComponent;
  let fixture: ComponentFixture<ResumenResumenCobrosItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenResumenCobrosItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenResumenCobrosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
