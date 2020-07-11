import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeBoletosAPesificarTotalComponent } from './definicion-de-boletos-apesificar-total.component';

describe('DefinicionDeBoletosAPesificarTotalComponent', () => {
  let component: DefinicionDeBoletosAPesificarTotalComponent;
  let fixture: ComponentFixture<DefinicionDeBoletosAPesificarTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeBoletosAPesificarTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeBoletosAPesificarTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
