import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Worldtoday } from './worldtoday';

describe('Worldtoday', () => {
  let component: Worldtoday;
  let fixture: ComponentFixture<Worldtoday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Worldtoday]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Worldtoday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
