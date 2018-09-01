import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtacteAplicadaComponent } from './ctacte-aplicada.component';

describe('CtacteAplicadaComponent', () => {
  let component: CtacteAplicadaComponent;
  let fixture: ComponentFixture<CtacteAplicadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtacteAplicadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtacteAplicadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
