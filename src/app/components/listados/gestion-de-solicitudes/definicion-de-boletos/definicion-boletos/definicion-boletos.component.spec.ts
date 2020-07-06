import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionBoletosComponent } from './definicion-boletos.component';

describe('DefinicionBoletosComponent', () => {
  let component: DefinicionBoletosComponent;
  let fixture: ComponentFixture<DefinicionBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
