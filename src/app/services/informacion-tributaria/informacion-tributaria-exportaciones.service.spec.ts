import { TestBed } from '@angular/core/testing';

import { InformacionTributariaExportacionesService } from './informacion-tributaria-exportaciones.service';

describe('InformacionTributariaExportacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformacionTributariaExportacionesService = TestBed.get(InformacionTributariaExportacionesService);
    expect(service).toBeTruthy();
  });
});
