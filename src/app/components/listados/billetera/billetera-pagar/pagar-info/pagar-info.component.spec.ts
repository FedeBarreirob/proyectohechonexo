import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarInfoComponent } from './pagar-info.component';

describe('PagarInfoComponent', () => {
  let component: PagarInfoComponent;
  let fixture: ComponentFixture<PagarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
