import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarListaDesktopComponent } from './merc-pend-entregar-lista-desktop.component';

describe('MercPendEntregarListaDesktopComponent', () => {
  let component: MercPendEntregarListaDesktopComponent;
  let fixture: ComponentFixture<MercPendEntregarListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MercPendEntregarListaDesktopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
