import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtacteComponent } from './ctacte.component';

describe('CtacteComponent', () => {
  let component: CtacteComponent;
  let fixture: ComponentFixture<CtacteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtacteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
