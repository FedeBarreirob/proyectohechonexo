import { TestBed, inject } from '@angular/core/testing';

import { VentasExportacionesService } from './ventas-exportaciones.service';

describe('VentasExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VentasExportacionesService]
    });
  });

  it('should be created', inject([VentasExportacionesService], (service: VentasExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
