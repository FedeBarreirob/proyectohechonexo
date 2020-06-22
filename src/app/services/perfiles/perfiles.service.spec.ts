import { TestBed, inject } from '@angular/core/testing';

import { PerfilesService } from './perfiles.service';

describe('PerfilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilesService]
    });
  });

  it('should be created', inject([PerfilesService], (service: PerfilesService) => {
    expect(service).toBeTruthy();
  }));
});
