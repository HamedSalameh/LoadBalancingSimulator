import { TestBed } from '@angular/core/testing';

import { ClientsPoolService } from './clients-pool.service';

describe('ClientsPoolService', () => {
  let service: ClientsPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
