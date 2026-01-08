import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salesreport } from './salesreport';

describe('Salesreport', () => {
  let component: Salesreport;
  let fixture: ComponentFixture<Salesreport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salesreport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salesreport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
