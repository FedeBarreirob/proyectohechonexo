import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DorsoDniComponent } from './dorso-dni.component';

describe('DorsoDniComponent', () => {
  let component: DorsoDniComponent;
  let fixture: ComponentFixture<DorsoDniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DorsoDniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DorsoDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
