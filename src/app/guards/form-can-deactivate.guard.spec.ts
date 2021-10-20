import { TestBed } from '@angular/core/testing';

import { FormCanDeactivateGuard } from './form-can-deactivate.guard';

describe('FormCanDeactivateGuard', () => {
  let guard: FormCanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormCanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
