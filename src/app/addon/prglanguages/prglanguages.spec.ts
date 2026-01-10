import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prglanguages } from './prglanguages';

describe('Prglanguages', () => {
  let component: Prglanguages;
  let fixture: ComponentFixture<Prglanguages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prglanguages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prglanguages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
