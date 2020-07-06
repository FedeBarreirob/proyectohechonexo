import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirBoletosComponent } from './definir-boletos.component';

describe('DefinirBoletosComponent', () => {
  let component: DefinirBoletosComponent;
  let fixture: ComponentFixture<DefinirBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinirBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
