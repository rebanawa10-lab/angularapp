import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salesseo } from './salesseo';

describe('Salesseo', () => {
  let component: Salesseo;
  let fixture: ComponentFixture<Salesseo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salesseo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salesseo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
