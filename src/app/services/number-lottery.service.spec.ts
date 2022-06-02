import { TestBed } from '@angular/core/testing';

import { NumberLotteryService } from './number-lottery.service';

describe('NumberLotteryService', () => {
  let service: NumberLotteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberLotteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
