import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaCteAplicadaMasOperacionesComponent } from './cta-cte-aplicada-mas-operaciones.component';

describe('CtaCteAplicadaMasOperacionesComponent', () => {
  let component: CtaCteAplicadaMasOperacionesComponent;
  let fixture: ComponentFixture<CtaCteAplicadaMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtaCteAplicadaMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaCteAplicadaMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
