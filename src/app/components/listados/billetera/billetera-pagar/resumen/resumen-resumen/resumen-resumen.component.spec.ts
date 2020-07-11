import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenResumenComponent } from './resumen-resumen.component';

describe('ResumenResumenComponent', () => {
  let component: ResumenResumenComponent;
  let fixture: ComponentFixture<ResumenResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
