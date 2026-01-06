import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usersupabase } from './usersupabase';

describe('Usersupabase', () => {
  let component: Usersupabase;
  let fixture: ComponentFixture<Usersupabase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usersupabase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usersupabase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
