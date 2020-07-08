import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeUnBoletoAFijarComponent } from './definicion-de-un-boleto-afijar.component';

describe('DefinicionDeUnBoletoAFijarComponent', () => {
  let component: DefinicionDeUnBoletoAFijarComponent;
  let fixture: ComponentFixture<DefinicionDeUnBoletoAFijarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeUnBoletoAFijarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeUnBoletoAFijarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
