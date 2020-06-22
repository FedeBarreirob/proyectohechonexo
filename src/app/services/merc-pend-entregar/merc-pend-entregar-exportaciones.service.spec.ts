import { TestBed, inject } from '@angular/core/testing';

import { MercPendEntregarExportacionesService } from './merc-pend-entregar-exportaciones.service';

describe('MercPendEntregarExportacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MercPendEntregarExportacionesService]
    });
  });

  it('should be created', inject([MercPendEntregarExportacionesService], (service: MercPendEntregarExportacionesService) => {
    expect(service).toBeTruthy();
  }));
});
