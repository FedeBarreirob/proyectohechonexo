import { TestBed } from '@angular/core/testing';

import { OnboardingUsuariosService } from './onboarding-usuarios.service';

describe('OnboardingUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardingUsuariosService = TestBed.get(OnboardingUsuariosService);
    expect(service).toBeTruthy();
  });
});
