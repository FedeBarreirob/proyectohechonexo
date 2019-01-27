import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCuentasComponent } from './selector-cuentas.component';

describe('SelectorCuentasComponent', () => {
  let component: SelectorCuentasComponent;
  let fixture: ComponentFixture<SelectorCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
