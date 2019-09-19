import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasItemDesktopComponent } from './entregas-item-desktop.component';

describe('EntregasItemDesktopComponent', () => {
  let component: EntregasItemDesktopComponent;
  let fixture: ComponentFixture<EntregasItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
