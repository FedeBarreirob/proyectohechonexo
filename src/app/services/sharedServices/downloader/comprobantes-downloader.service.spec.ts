import { TestBed, inject } from '@angular/core/testing';

import { ComprobantesDownloaderService } from './comprobantes-downloader.service';

describe('ComprobantesDownloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprobantesDownloaderService]
    });
  });

  it('should be created', inject([ComprobantesDownloaderService], (service: ComprobantesDownloaderService) => {
    expect(service).toBeTruthy();
  }));
});
