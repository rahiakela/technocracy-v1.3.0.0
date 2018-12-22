import { TestBed, inject } from '@angular/core/testing';

import { GoogleFileUploadService } from './google-file-upload.service';

describe('GoogleFileUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleFileUploadService]
    });
  });

  it('should be created', inject([GoogleFileUploadService], (service: GoogleFileUploadService) => {
    expect(service).toBeTruthy();
  }));
});
