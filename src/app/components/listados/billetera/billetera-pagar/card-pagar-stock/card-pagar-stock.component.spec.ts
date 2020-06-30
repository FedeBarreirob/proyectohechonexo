import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPagarStockComponent } from './card-pagar-stock.component';

describe('CardPagarStockComponent', () => {
  let component: CardPagarStockComponent;
  let fixture: ComponentFixture<CardPagarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPagarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPagarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
