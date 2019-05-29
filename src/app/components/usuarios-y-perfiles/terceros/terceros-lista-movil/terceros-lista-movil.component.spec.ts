import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerosListaMovilComponent } from './terceros-lista-movil.component';

describe('TercerosListaMovilComponent', () => {
  let component: TercerosListaMovilComponent;
  let fixture: ComponentFixture<TercerosListaMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TercerosListaMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosListaMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
