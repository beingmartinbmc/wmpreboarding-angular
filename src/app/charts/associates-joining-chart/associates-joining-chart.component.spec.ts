import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssociatesJoiningChartComponent} from './associates-joining-chart.component';

describe('AssociatesJoiningChartComponent', () => {
  let component: AssociatesJoiningChartComponent;
  let fixture: ComponentFixture<AssociatesJoiningChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociatesJoiningChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatesJoiningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
