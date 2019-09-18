import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasHeaderItemDesktopComponent } from './entregas-header-item-desktop.component';

describe('EntregasHeaderItemDesktopComponent', () => {
  let component: EntregasHeaderItemDesktopComponent;
  let fixture: ComponentFixture<EntregasHeaderItemDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasHeaderItemDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasHeaderItemDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
