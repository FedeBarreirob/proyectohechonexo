import { TestBed } from '@angular/core/testing';

import { InformacionTributariaService } from './informacion-tributaria.service';

describe('InformacionTributariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformacionTributariaService = TestBed.get(InformacionTributariaService);
    expect(service).toBeTruthy();
  });
});
