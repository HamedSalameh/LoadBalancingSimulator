import { TestBed } from '@angular/core/testing';

import { ServersPoolService } from './servers-pool.service';

describe('ServersPoolService', () => {
  let service: ServersPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServersPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
