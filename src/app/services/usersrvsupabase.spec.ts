import { TestBed } from '@angular/core/testing';

import { Usersrvsupabase } from './usersrvsupabase';

describe('Usersrvsupabase', () => {
  let service: Usersrvsupabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usersrvsupabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
