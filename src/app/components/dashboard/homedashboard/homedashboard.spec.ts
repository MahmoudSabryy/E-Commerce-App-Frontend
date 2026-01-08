import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homedashboard } from './homedashboard';

describe('Homedashboard', () => {
  let component: Homedashboard;
  let fixture: ComponentFixture<Homedashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homedashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homedashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
