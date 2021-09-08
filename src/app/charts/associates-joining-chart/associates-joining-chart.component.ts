import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {AssociateService} from '../../services/associate.service';

@Component({
  selector: 'app-associates-joining-chart',
  templateUrl: './associates-joining-chart.component.html',
  styleUrls: ['./associates-joining-chart.component.css']
})
export class AssociatesJoiningChartComponent implements OnInit {
  errorMessage: string;

  public associatesChartData: ChartDataSets[] = [
    { data: [], label: 'Total Associates' },
  ];

  public associateChartLabels: Label[] = [];

  public associatesChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public associatesChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(12, 202, 74,1)',
    },
  ];
  public associatesChartLegend = true;
  public associatesChartType: ChartType = 'line';
  public associatesChartPlugins = [];

  constructor(private associateService: AssociateService) { }

  ngOnInit() {
    this.associateService.getAssociatesDataByMonth().subscribe({
      next: associateItems => {
        associateItems.forEach(li => {
          this.associatesChartData[0].data.push(li.count);
          this.associateChartLabels.push(li.month);
        });
      },
      error: err => this.errorMessage = err
    });
  }

}
