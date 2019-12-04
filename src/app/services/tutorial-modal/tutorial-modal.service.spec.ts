import { TestBed, inject } from '@angular/core/testing';

import { TutorialModalService } from './tutorial-modal.service';

describe('TutorialModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorialModalService]
    });
  });

  it('should be created', inject([TutorialModalService], (service: TutorialModalService) => {
    expect(service).toBeTruthy();
  }));
});
