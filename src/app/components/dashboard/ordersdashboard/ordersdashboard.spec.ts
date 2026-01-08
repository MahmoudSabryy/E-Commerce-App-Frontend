import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ordersdashboard } from './ordersdashboard';

describe('Ordersdashboard', () => {
  let component: Ordersdashboard;
  let fixture: ComponentFixture<Ordersdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ordersdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ordersdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
