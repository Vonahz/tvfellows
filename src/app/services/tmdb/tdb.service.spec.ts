import { TestBed, inject } from '@angular/core/testing';

import { TdbService } from './tdb.service';

describe('TdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TdbService]
    });
  });

  it('should be created', inject([TdbService], (service: TdbService) => {
    expect(service).toBeTruthy();
  }));
});
