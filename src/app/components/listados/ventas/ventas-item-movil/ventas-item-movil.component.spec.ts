import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasItemMovilComponent } from './ventas-item-movil.component';

describe('VentasItemMovilComponent', () => {
  let component: VentasItemMovilComponent;
  let fixture: ComponentFixture<VentasItemMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasItemMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasItemMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
