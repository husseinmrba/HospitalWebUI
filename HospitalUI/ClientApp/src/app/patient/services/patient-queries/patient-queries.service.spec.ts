import { TestBed } from '@angular/core/testing';

import { PatientQueriesService } from './patient-queries.service';

describe('PatientQueriesService', () => {
  let service: PatientQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
