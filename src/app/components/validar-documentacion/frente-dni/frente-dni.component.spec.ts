import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrenteDniComponent } from './frente-dni.component';

describe('FrenteDniComponent', () => {
  let component: FrenteDniComponent;
  let fixture: ComponentFixture<FrenteDniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrenteDniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrenteDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
