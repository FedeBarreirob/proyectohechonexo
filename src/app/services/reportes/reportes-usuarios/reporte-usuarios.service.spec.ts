import { TestBed } from '@angular/core/testing';

import { ReporteUsuariosService } from './reporte-usuarios.service';

describe('ReporteUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteUsuariosService = TestBed.get(ReporteUsuariosService);
    expect(service).toBeTruthy();
  });
});
