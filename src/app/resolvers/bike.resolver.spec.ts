import { TestBed } from '@angular/core/testing';

import { BikeResolver } from './bike.resolver';

describe('BikeResolver', () => {
  let resolver: BikeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BikeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
