import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesAutocompleteComponent } from './perfiles-autocomplete.component';

describe('PerfilesAutocompleteComponent', () => {
  let component: PerfilesAutocompleteComponent;
  let fixture: ComponentFixture<PerfilesAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilesAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
