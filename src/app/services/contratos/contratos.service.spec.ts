import { TestBed } from '@angular/core/testing';

import { ContratosService } from './contratos.service';

describe('ContratosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContratosService = TestBed.get(ContratosService);
    expect(service).toBeTruthy();
  });
});
