import { TestBed } from '@angular/core/testing';

import { MiserviceService } from './miservice.service';

describe('MiserviceService', () => {
  let service: MiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
