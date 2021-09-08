import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatesStatusChartComponent } from './associates-status-chart.component';

describe('AssociatesStatusChartComponent', () => {
  let component: AssociatesStatusChartComponent;
  let fixture: ComponentFixture<AssociatesStatusChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatesStatusChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatesStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
