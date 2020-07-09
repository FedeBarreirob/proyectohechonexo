import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeBoletosAFijarComponent } from './definicion-de-boletos-afijar.component';

describe('DefinicionDeBoletosAFijarComponent', () => {
  let component: DefinicionDeBoletosAFijarComponent;
  let fixture: ComponentFixture<DefinicionDeBoletosAFijarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeBoletosAFijarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeBoletosAFijarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
