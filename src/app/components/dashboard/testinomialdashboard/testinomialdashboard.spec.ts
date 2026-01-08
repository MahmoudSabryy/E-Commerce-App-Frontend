import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testinomialdashboard } from './testinomialdashboard';

describe('Testinomialdashboard', () => {
  let component: Testinomialdashboard;
  let fixture: ComponentFixture<Testinomialdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testinomialdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testinomialdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
