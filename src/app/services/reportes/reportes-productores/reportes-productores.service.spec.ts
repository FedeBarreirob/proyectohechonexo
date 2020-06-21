import { TestBed } from '@angular/core/testing';

import { ReporteProductoresService } from './reporte-usuarios.service';

describe('ReporteProductoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteProductoresService = TestBed.get(ReporteProductoresService);
    expect(service).toBeTruthy();
  });
});
