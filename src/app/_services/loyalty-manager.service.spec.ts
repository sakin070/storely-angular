import { TestBed } from '@angular/core/testing';

import { LoyaltyManagerService } from './loyalty-manager.service';

describe('LoyaltyManagerService', () => {
  let service: LoyaltyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyaltyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
