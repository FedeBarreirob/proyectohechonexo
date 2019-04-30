import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaCteFiltroComponent } from './cta-cte-filtro.component';

describe('CtaCteFiltroComponent', () => {
  let component: CtaCteFiltroComponent;
  let fixture: ComponentFixture<CtaCteFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtaCteFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaCteFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
