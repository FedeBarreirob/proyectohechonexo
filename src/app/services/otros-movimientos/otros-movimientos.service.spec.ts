import { TestBed, inject } from '@angular/core/testing';

import { OtrosMovimientosService } from './otros-movimientos.service';

describe('OtrosMovimientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtrosMovimientosService]
    });
  });

  it('should be created', inject([OtrosMovimientosService], (service: OtrosMovimientosService) => {
    expect(service).toBeTruthy();
  }));
});
