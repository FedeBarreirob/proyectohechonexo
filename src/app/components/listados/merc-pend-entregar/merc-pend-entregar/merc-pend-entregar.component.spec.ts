import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarComponent } from './merc-pend-entregar.component';

describe('MercPendEntregarComponent', () => {
  let component: MercPendEntregarComponent;
  let fixture: ComponentFixture<MercPendEntregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
