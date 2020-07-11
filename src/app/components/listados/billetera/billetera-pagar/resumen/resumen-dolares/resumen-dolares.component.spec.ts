import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDolaresComponent } from './resumen-dolares.component';

describe('ResumenDolaresComponent', () => {
  let component: ResumenDolaresComponent;
  let fixture: ComponentFixture<ResumenDolaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDolaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDolaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
