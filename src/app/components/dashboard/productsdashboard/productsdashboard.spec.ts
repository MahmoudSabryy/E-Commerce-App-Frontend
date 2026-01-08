import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productsdashboard } from './productsdashboard';

describe('Productsdashboard', () => {
  let component: Productsdashboard;
  let fixture: ComponentFixture<Productsdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productsdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productsdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
