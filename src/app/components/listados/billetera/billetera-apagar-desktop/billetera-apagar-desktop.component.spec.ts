import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraApagarDesktopComponent } from './billetera-apagar-desktop.component';

describe('BilleteraApagarDesktopComponent', () => {
  let component: BilleteraApagarDesktopComponent;
  let fixture: ComponentFixture<BilleteraApagarDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraApagarDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraApagarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
