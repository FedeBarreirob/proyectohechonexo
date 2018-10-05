import { TestBed, inject } from '@angular/core/testing';

import { CompPendFactExportacionesService } from './comp-pend-fact-exportaciones.service';

describe('CompPendFactExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompPendFactExportacionesService]
    });
  });

  it('should be created', inject([CompPendFactExportacionesService], (service: CompPendFactExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
