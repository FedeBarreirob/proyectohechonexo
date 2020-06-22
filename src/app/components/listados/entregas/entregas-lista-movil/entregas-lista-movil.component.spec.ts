import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasListaMovilComponent } from './entregas-lista-movil.component';

describe('EntregasListaMovilComponent', () => {
  let component: EntregasListaMovilComponent;
  let fixture: ComponentFixture<EntregasListaMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasListaMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasListaMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
