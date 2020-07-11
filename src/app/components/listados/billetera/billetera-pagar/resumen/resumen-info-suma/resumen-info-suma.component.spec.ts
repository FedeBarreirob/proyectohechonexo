import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenInfoSumaComponent } from './resumen-info-suma.component';

describe('ResumenInfoSumaComponent', () => {
  let component: ResumenInfoSumaComponent;
  let fixture: ComponentFixture<ResumenInfoSumaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenInfoSumaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenInfoSumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
