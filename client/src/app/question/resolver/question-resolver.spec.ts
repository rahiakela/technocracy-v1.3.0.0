import { TestBed, inject } from '@angular/core/testing';

import { QuestionResolver } from './question-resolver';

describe('QuestionResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionResolver]
    });
  });

  it('should be created', inject([QuestionResolver], (service: QuestionResolver) => {
    expect(service).toBeTruthy();
  }));
});
