import { TestBed } from '@angular/core/testing';

import { Testinomialservice } from './testinomialservice';

describe('Testinomialservice', () => {
  let service: Testinomialservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Testinomialservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
