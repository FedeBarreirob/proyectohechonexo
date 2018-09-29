import { TestBed, inject } from '@angular/core/testing';

import { CtaCteExportacionesService } from './cta-cte-exportaciones.service';

describe('CtaCteExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtaCteExportacionesService]
    });
  });

  it('should be created', inject([CtaCteExportacionesService], (service: CtaCteExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
