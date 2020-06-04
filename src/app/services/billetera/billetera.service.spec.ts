import { TestBed } from '@angular/core/testing';

import { BilleteraService } from './billetera.service';

describe('BilleteraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BilleteraService = TestBed.get(BilleteraService);
    expect(service).toBeTruthy();
  });
});
