import { TestBed, inject } from '@angular/core/testing';

import { OneSignalService } from './one-signal.service';

describe('OneSignalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OneSignalService]
    });
  });

  it('should be created', inject([OneSignalService], (service: OneSignalService) => {
    expect(service).toBeTruthy();
  }));
});
