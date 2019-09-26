import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerosListaDesktopComponent } from './terceros-lista-desktop.component';

describe('TercerosListaDesktopComponent', () => {
  let component: TercerosListaDesktopComponent;
  let fixture: ComponentFixture<TercerosListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TercerosListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
