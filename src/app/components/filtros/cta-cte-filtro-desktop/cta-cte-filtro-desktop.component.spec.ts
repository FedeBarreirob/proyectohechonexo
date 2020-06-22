import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaCteFiltroDesktopComponent } from './cta-cte-filtro-desktop.component';

describe('CtaCteFiltroDesktopComponent', () => {
  let component: CtaCteFiltroDesktopComponent;
  let fixture: ComponentFixture<CtaCteFiltroDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtaCteFiltroDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaCteFiltroDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
