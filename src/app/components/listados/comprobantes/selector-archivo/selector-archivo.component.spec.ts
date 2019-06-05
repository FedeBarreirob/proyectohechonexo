import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorArchivoComponent } from './selector-archivo.component';

describe('SelectorArchivoComponent', () => {
  let component: SelectorArchivoComponent;
  let fixture: ComponentFixture<SelectorArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
