import { TestBed, inject } from '@angular/core/testing';

import { CtaCteAplicadaExportacionesServiceService } from './cta-cte-aplicada-exportaciones-service.service';

describe('CtaCteAplicadaExportacionesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtaCteAplicadaExportacionesServiceService]
    });
  });

  it('should be created', inject([CtaCteAplicadaExportacionesServiceService], (service: CtaCteAplicadaExportacionesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
