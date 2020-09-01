import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPerfilLimiteCreditoComponent } from './info-perfil-limite-credito.component';

describe('InfoPerfilLimiteCreditoComponent', () => {
  let component: InfoPerfilLimiteCreditoComponent;
  let fixture: ComponentFixture<InfoPerfilLimiteCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPerfilLimiteCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPerfilLimiteCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
