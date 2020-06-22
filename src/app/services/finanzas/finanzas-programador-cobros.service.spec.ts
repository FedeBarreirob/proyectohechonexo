import { TestBed } from '@angular/core/testing';

import { FinanzasProgramadorCobrosService } from './finanzas-programador-cobros.service';

describe('FinanzasProgramadorCobrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinanzasProgramadorCobrosService = TestBed.get(FinanzasProgramadorCobrosService);
    expect(service).toBeTruthy();
  });
});
