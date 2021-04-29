import { TestBed } from '@angular/core/testing';

import { MakeSaleService } from './make-sale.service';

describe('MakeSaleService', () => {
  let service: MakeSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
