import { TestBed } from '@angular/core/testing';

import { PatientCommandsService } from './patient-commands.service';

describe('PatientCommandsService', () => {
  let service: PatientCommandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCommandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
