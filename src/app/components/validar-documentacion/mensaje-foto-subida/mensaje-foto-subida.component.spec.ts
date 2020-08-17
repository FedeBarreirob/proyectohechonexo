import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeFotoSubidaComponent } from './mensaje-foto-subida.component';

describe('MensajeFotoSubidaComponent', () => {
  let component: MensajeFotoSubidaComponent;
  let fixture: ComponentFixture<MensajeFotoSubidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeFotoSubidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeFotoSubidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
