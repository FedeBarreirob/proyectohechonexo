import { TestBed, inject } from '@angular/core/testing';

import { CtacteService } from './ctacte.service';

describe('CtacteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtacteService]
    });
  });

  it('should be created', inject([CtacteService], (service: CtacteService) => {
    expect(service).toBeTruthy();
  }));
});
