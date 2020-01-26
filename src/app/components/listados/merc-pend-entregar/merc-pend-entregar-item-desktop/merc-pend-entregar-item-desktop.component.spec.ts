import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercPendEntregarItemDesktopComponent } from './merc-pend-entregar-item-desktop.component';

describe('MercPendEntregarItemDesktopComponent', () => {
  let component: MercPendEntregarItemDesktopComponent;
  let fixture: ComponentFixture<MercPendEntregarItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercPendEntregarItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercPendEntregarItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
