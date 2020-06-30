import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarMaizComponent } from './pagar-maiz.component';

describe('PagarMaizComponent', () => {
  let component: PagarMaizComponent;
  let fixture: ComponentFixture<PagarMaizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarMaizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarMaizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
