import { TestBed, inject } from '@angular/core/testing';

import { ShoopingCartService } from './shooping-cart.service';

describe('ShoopingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoopingCartService]
    });
  });

  it('should be created', inject([ShoopingCartService], (service: ShoopingCartService) => {
    expect(service).toBeTruthy();
  }));
});
