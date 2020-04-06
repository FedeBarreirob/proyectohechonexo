import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionadosModalComponent } from './seleccionados-modal.component';

describe('SeleccionadosModalComponent', () => {
  let component: SeleccionadosModalComponent;
  let fixture: ComponentFixture<SeleccionadosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionadosModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionadosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
