import { TestBed } from '@angular/core/testing';

import { BikeResolve } from './bike-resolve.service';

describe('BikeResolveService', () => {
  let service: BikeResolve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeResolve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
