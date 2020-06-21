import { TestBed, inject } from '@angular/core/testing';

import { ComprobantesPendFacturarService } from './comprobantes-pend-facturar.service';

describe('ComprobantesPendFacturarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprobantesPendFacturarService]
    });
  });

  it('should be created', inject([ComprobantesPendFacturarService], (service: ComprobantesPendFacturarService) => {
    expect(service).toBeTruthy();
  }));
});
