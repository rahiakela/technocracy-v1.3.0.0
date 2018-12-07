import { TestBed, inject } from '@angular/core/testing';

import { CookieBackendService } from './cookie-backend.service';

describe('CookieBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieBackendService]
    });
  });

  it('should be created', inject([CookieBackendService], (service: CookieBackendService) => {
    expect(service).toBeTruthy();
  }));
});
