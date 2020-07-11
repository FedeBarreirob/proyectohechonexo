import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeBoletosAPesificarComponent } from './definicion-de-boletos-apesificar.component';

describe('DefinicionDeBoletosAPesificarComponent', () => {
  let component: DefinicionDeBoletosAPesificarComponent;
  let fixture: ComponentFixture<DefinicionDeBoletosAPesificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeBoletosAPesificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeBoletosAPesificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
