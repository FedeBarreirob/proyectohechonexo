import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasListaDesktopComponent } from './entregas-lista-desktop.component';

describe('EntregasListaDesktopComponent', () => {
  let component: EntregasListaDesktopComponent;
  let fixture: ComponentFixture<EntregasListaDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasListaDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasListaDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
