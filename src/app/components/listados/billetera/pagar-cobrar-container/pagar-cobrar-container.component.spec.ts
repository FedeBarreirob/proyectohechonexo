import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarCobrarContainerComponent } from './pagar-cobrar-container.component';

describe('PagarCobrarContainerComponent', () => {
  let component: PagarCobrarContainerComponent;
  let fixture: ComponentFixture<PagarCobrarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarCobrarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarCobrarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
