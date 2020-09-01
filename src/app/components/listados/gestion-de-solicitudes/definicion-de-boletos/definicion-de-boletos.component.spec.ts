import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinicionDeBoletosComponent } from './definicion-de-boletos.component';

describe('DefinicionDeBoletosComponent', () => {
  let component: DefinicionDeBoletosComponent;
  let fixture: ComponentFixture<DefinicionDeBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinicionDeBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicionDeBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
