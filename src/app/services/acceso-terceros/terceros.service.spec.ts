import { TestBed, inject } from '@angular/core/testing';

import { TercerosService } from './terceros.service';

describe('TercerosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TercerosService]
    });
  });

  it('should be created', inject([TercerosService], (service: TercerosService) => {
    expect(service).toBeTruthy();
  }));
});
