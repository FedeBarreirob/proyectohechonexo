import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOperacionesMovilComponent } from './lista-operaciones-movil.component';

describe('ListaOperacionesMovilComponent', () => {
  let component: ListaOperacionesMovilComponent;
  let fixture: ComponentFixture<ListaOperacionesMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaOperacionesMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOperacionesMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
