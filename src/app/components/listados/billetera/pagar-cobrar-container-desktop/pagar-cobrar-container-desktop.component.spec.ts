import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarCobrarContainerDesktopComponent } from './pagar-cobrar-container-desktop.component';

describe('PagarCobrarContainerDesktopComponent', () => {
  let component: PagarCobrarContainerDesktopComponent;
  let fixture: ComponentFixture<PagarCobrarContainerDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarCobrarContainerDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarCobrarContainerDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
