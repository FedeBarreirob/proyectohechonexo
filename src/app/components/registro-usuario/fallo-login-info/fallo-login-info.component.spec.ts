import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalloLoginInfoComponent } from './fallo-login-info.component';

describe('FalloLoginInfoComponent', () => {
  let component: FalloLoginInfoComponent;
  let fixture: ComponentFixture<FalloLoginInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalloLoginInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalloLoginInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
