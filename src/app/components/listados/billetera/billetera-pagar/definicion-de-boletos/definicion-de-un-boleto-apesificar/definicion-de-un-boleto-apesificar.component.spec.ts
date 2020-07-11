import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeUnBoletoAPesificarComponent } from './definicion-de-un-boleto-apesificar.component';

describe('DefinicionDeUnBoletoAPesificarComponent', () => {
  let component: DefinicionDeUnBoletoAPesificarComponent;
  let fixture: ComponentFixture<DefinicionDeUnBoletoAPesificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeUnBoletoAPesificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeUnBoletoAPesificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
