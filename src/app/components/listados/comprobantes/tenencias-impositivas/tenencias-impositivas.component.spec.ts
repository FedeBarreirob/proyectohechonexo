import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenenciasImpositivasComponent } from './tenencias-impositivas.component';

describe('TenenciasImpositivasComponent', () => {
  let component: TenenciasImpositivasComponent;
  let fixture: ComponentFixture<TenenciasImpositivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenenciasImpositivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenenciasImpositivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
