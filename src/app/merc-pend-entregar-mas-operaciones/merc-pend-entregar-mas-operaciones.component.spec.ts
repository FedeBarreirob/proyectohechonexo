import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarMasOperacionesComponent } from './merc-pend-entregar-mas-operaciones.component';

describe('MercPendEntregarMasOperacionesComponent', () => {
  let component: MercPendEntregarMasOperacionesComponent;
  let fixture: ComponentFixture<MercPendEntregarMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
