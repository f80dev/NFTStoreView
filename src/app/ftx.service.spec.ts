import { TestBed } from '@angular/core/testing';

import { FtxService } from './ftx.service';

describe('FtxService', () => {
  let service: FtxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
