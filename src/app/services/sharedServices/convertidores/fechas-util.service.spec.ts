import { TestBed } from '@angular/core/testing';

import { FechasUtilService } from './fechas-util.service';

describe('FechasUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FechasUtilService = TestBed.get(FechasUtilService);
    expect(service).toBeTruthy();
  });
});
