import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salesmandtl } from './salesmandtl';

describe('Salesmandtl', () => {
  let component: Salesmandtl;
  let fixture: ComponentFixture<Salesmandtl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salesmandtl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salesmandtl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
