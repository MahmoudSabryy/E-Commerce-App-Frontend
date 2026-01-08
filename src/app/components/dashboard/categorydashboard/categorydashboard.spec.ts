import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorydashboard } from './categorydashboard';

describe('Categorydashboard', () => {
  let component: Categorydashboard;
  let fixture: ComponentFixture<Categorydashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categorydashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categorydashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
