import { TestBed, async, inject } from '@angular/core/testing';

import { ValidacionDeIdentidadGuard } from './validacion-de-identidad.guard';

describe('ValidacionDeIdentidadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidacionDeIdentidadGuard]
    });
  });

  it('should ...', inject([ValidacionDeIdentidadGuard], (guard: ValidacionDeIdentidadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
