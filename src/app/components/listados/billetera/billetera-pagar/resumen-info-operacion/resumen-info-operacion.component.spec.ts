import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenInfoOperacionComponent } from './resumen-info-operacion.component';

describe('ResumenInfoOperacionComponent', () => {
  let component: ResumenInfoOperacionComponent;
  let fixture: ComponentFixture<ResumenInfoOperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenInfoOperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenInfoOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
