import { TestBed, inject } from '@angular/core/testing';

import { MercPendEntregarService } from './merc-pend-entregar.service';

describe('MercPendEntregarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MercPendEntregarService]
    });
  });

  it('should be created', inject([MercPendEntregarService], (service: MercPendEntregarService) => {
    expect(service).toBeTruthy();
  }));
});
