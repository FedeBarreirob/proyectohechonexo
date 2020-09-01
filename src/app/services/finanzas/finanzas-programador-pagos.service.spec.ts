import { TestBed } from '@angular/core/testing';

import { FinanzasProgramadorPagosService } from './finanzas-programador-pagos.service';

describe('FinanzasProgramadorPagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinanzasProgramadorPagosService = TestBed.get(FinanzasProgramadorPagosService);
    expect(service).toBeTruthy();
  });
});
