import { TestBed } from '@angular/core/testing';

import { ActiveOrdersResolverService } from './active-orders-resolver.service';

describe('ActiveOrdersResolverService', () => {
  let service: ActiveOrdersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveOrdersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
