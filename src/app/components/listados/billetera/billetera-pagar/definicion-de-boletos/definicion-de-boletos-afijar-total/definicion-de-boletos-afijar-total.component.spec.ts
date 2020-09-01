import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeBoletosAFijarTotalComponent } from './definicion-de-boletos-afijar-total.component';

describe('DefinicionDeBoletosAFijarTotalComponent', () => {
  let component: DefinicionDeBoletosAFijarTotalComponent;
  let fixture: ComponentFixture<DefinicionDeBoletosAFijarTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeBoletosAFijarTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeBoletosAFijarTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
