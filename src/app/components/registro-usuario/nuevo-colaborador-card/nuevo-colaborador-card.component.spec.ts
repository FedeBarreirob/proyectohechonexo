import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoColaboradorCardComponent } from './nuevo-colaborador-card.component';

describe('NuevoColaboradorCardComponent', () => {
  let component: NuevoColaboradorCardComponent;
  let fixture: ComponentFixture<NuevoColaboradorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoColaboradorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoColaboradorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
