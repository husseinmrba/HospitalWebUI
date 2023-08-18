import { TestBed } from '@angular/core/testing';

import { JsonPatchService } from './json-patch.service';

describe('JsonPatchService', () => {
  let service: JsonPatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
