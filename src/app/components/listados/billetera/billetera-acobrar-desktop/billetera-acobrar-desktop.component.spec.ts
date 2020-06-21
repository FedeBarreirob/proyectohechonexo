import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraAcobrarDesktopComponent } from './billetera-acobrar-desktop.component';

describe('BilleteraAcobrarDesktopComponent', () => {
  let component: BilleteraAcobrarDesktopComponent;
  let fixture: ComponentFixture<BilleteraAcobrarDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraAcobrarDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraAcobrarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
