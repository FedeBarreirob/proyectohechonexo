import { TestBed, inject } from '@angular/core/testing';

import { CtacteAplicadaService } from './ctacte-aplicada.service';

describe('CtacteAplicadaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtacteAplicadaService]
    });
  });

  it('should be created', inject([CtacteAplicadaService], (service: CtacteAplicadaService) => {
    expect(service).toBeTruthy();
  }));
});
