import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salesmanyr } from './salesmanyr';

describe('Salesmanyr', () => {
  let component: Salesmanyr;
  let fixture: ComponentFixture<Salesmanyr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salesmanyr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salesmanyr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
