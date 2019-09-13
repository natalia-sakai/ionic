import { TestBed } from '@angular/core/testing';

import { InformativoService } from './informativo.service';

describe('InformativoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformativoService = TestBed.get(InformativoService);
    expect(service).toBeTruthy();
  });
});
