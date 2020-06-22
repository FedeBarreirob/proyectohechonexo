import { TestBed } from '@angular/core/testing';

import { DownloaderUtilService } from './downloader-util.service';

describe('DownloaderUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloaderUtilService = TestBed.get(DownloaderUtilService);
    expect(service).toBeTruthy();
  });
});
