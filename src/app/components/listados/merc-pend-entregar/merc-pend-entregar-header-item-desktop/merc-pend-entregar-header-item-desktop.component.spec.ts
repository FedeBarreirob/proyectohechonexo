import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarHeaderItemDesktopComponent } from './merc-pend-entregar-header-item-desktop.component';

describe('MercPendEntregarHeaderItemDesktopComponent', () => {
  let component: MercPendEntregarHeaderItemDesktopComponent;
  let fixture: ComponentFixture<MercPendEntregarHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarHeaderItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
