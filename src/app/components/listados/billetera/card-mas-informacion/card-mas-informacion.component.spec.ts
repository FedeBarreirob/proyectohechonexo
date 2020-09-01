import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMasInformacionComponent } from './card-mas-informacion.component';

describe('CardMasInformacionComponent', () => {
  let component: CardMasInformacionComponent;
  let fixture: ComponentFixture<CardMasInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMasInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMasInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
