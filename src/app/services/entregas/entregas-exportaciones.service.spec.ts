import { TestBed, inject } from '@angular/core/testing';

import { EntregasExportacionesService } from './entregas-exportaciones.service';

describe('EntregasExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntregasExportacionesService]
    });
  });

  it('should be created', inject([EntregasExportacionesService], (service: EntregasExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
