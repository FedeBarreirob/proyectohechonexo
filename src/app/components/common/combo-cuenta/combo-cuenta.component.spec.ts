import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCuentaComponent } from './combo-cuenta.component';

describe('ComboCuentaComponent', () => {
  let component: ComboCuentaComponent;
  let fixture: ComponentFixture<ComboCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
