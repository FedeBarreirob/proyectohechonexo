import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarFiltroComponent } from './pagar-filtro.component';

describe('PagarFiltroComponent', () => {
  let component: PagarFiltroComponent;
  let fixture: ComponentFixture<PagarFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
