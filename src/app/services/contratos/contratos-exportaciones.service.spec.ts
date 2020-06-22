import { TestBed, inject } from '@angular/core/testing';

import { ContratosExportacionesService } from './contratos-exportaciones.service';

describe('ContratosExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContratosExportacionesService]
    });
  });

  it('should be created', inject([ContratosExportacionesService], (service: ContratosExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
