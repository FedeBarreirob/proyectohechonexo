import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasMasOperacionesComponent } from './entregas-mas-operaciones.component';

describe('EntregasMasOperacionesComponent', () => {
  let component: EntregasMasOperacionesComponent;
  let fixture: ComponentFixture<EntregasMasOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasMasOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasMasOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
