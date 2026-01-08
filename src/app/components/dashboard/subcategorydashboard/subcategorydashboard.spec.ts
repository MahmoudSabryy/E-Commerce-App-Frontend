import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subcategorydashboard } from './subcategorydashboard';

describe('Subcategorydashboard', () => {
  let component: Subcategorydashboard;
  let fixture: ComponentFixture<Subcategorydashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subcategorydashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subcategorydashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
