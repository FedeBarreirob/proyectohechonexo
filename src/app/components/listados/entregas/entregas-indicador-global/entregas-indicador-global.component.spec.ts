import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasIndicadorGlobalComponent } from './entregas-indicador-global.component';

describe('EntregasIndicadorGlobalComponent', () => {
  let component: EntregasIndicadorGlobalComponent;
  let fixture: ComponentFixture<EntregasIndicadorGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasIndicadorGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasIndicadorGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
