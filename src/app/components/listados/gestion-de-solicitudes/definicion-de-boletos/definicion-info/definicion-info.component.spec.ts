import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionInfoComponent } from './definicion-info.component';

describe('DefinicionInfoComponent', () => {
  let component: DefinicionInfoComponent;
  let fixture: ComponentFixture<DefinicionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
