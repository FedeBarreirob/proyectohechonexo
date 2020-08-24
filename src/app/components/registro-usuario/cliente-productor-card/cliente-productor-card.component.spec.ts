import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProductorCardComponent } from './cliente-productor-card.component';

describe('ClienteProductorCardComponent', () => {
  let component: ClienteProductorCardComponent;
  let fixture: ComponentFixture<ClienteProductorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteProductorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteProductorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
