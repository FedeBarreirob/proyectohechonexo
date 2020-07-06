import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPesosComponent } from './resumen-pesos.component';

describe('ResumenPesosComponent', () => {
  let component: ResumenPesosComponent;
  let fixture: ComponentFixture<ResumenPesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenPesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenPesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
