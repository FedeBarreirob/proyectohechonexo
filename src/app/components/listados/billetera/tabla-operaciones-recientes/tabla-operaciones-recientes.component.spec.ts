import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOperacionesRecientesComponent } from './tabla-operaciones-recientes.component';

describe('TablaOperacionesRecientesComponent', () => {
  let component: TablaOperacionesRecientesComponent;
  let fixture: ComponentFixture<TablaOperacionesRecientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOperacionesRecientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOperacionesRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
