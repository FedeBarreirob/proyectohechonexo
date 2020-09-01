import { TestBed } from '@angular/core/testing';

import { CuestionariosService } from './cuestionarios.service';

describe('CuestionariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuestionariosService = TestBed.get(CuestionariosService);
    expect(service).toBeTruthy();
  });
});
