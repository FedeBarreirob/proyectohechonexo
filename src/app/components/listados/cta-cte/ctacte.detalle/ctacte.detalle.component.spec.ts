import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ctacte.DetalleComponent } from './ctacte.detalle.component';

describe('Ctacte.DetalleComponent', () => {
  let component: Ctacte.DetalleComponent;
  let fixture: ComponentFixture<Ctacte.DetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ctacte.DetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ctacte.DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
