import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarCanjeTotalComponent } from './pagar-canje-total.component';

describe('PagarCanjeTotalComponent', () => {
  let component: PagarCanjeTotalComponent;
  let fixture: ComponentFixture<PagarCanjeTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarCanjeTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarCanjeTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
