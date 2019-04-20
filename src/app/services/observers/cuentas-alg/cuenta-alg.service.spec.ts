import { TestBed } from '@angular/core/testing';

import { CuentaAlgService } from './cuenta-alg.service';

describe('CuentaAlgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaAlgService = TestBed.get(CuentaAlgService);
    expect(service).toBeTruthy();
  });
});
