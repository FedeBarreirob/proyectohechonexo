import { TestBed, inject } from '@angular/core/testing';

import { OtrosMovimientosExportacionesService } from './otros-movimientos-exportaciones.service';

describe('OtrosMovimientosExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtrosMovimientosExportacionesService]
    });
  });

  it('should be created', inject([OtrosMovimientosExportacionesService], (service: OtrosMovimientosExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
