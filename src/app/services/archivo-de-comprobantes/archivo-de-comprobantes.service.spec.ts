import { TestBed, inject } from '@angular/core/testing';

import { ArchivoDeComprobantesService } from './archivo-de-comprobantes.service';

describe('ArchivoDeComprobantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivoDeComprobantesService]
    });
  });

  it('should be created', inject([ArchivoDeComprobantesService], (service: ArchivoDeComprobantesService) => {
    expect(service).toBeTruthy();
  }));
});
