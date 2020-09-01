import { TestBed } from '@angular/core/testing';

import { CuentasBancariasService } from './cuentas-bancarias.service';

describe('CuentasBancariasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentasBancariasService = TestBed.get(CuentasBancariasService);
    expect(service).toBeTruthy();
  });
});
