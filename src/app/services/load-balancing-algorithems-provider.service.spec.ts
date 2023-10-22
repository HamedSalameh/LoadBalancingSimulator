import { TestBed } from '@angular/core/testing';

import { LoadBalancingAlgorithemsProviderService } from './load-balancing-algorithems-provider.service';

describe('LoadBalancingAlgorithemsProviderService', () => {
  let service: LoadBalancingAlgorithemsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadBalancingAlgorithemsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
