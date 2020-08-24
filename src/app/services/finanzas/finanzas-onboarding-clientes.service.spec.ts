import { TestBed } from '@angular/core/testing';

import { FinanzasOnboardingClientesService } from './finanzas-onboarding-clientes.service';

describe('FinanzasOnboardingClientesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinanzasOnboardingClientesService = TestBed.get(FinanzasOnboardingClientesService);
    expect(service).toBeTruthy();
  });
});
