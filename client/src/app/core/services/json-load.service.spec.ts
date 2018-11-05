import { TestBed, inject } from '@angular/core/testing';

import { JsonLoadService } from './json-load.service';

describe('JsonLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonLoadService]
    });
  });

  it('should be created', inject([JsonLoadService], (service: JsonLoadService) => {
    expect(service).toBeTruthy();
  }));
});
