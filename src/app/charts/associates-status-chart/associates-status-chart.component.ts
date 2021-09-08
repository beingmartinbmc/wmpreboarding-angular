import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';
import {AssociateService} from '../../services/associate.service';

@Component({
  selector: 'app-associates-status-chart',
  templateUrl: './associates-status-chart.component.html',
  styleUrls: ['./associates-status-chart.component.css']
})
export class AssociatesStatusChartComponent implements OnInit {
  errorMessage: string;

  public associateChartOptions: ChartOptions = {
    responsive: true,
  };
  public associateChartLabels: Label[] = ['Will join', 'Maybe', 'Won\'t join'];
  public associateChartData: SingleDataSet = [];
  public associateChartType: ChartType = 'pie';
  public associateChartLegend = true;
  public associateChartPlugins = [];

  public associateChartColors: Array<any> = [{
    backgroundColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
  }];

  constructor(private associateService: AssociateService) {
  }

  will = 0;
  maybe = 0;
  wont = 0;

  ngOnInit() {
    this.associateService.getUnpagedAssociates().subscribe({
      next: associateItems => {
        associateItems.forEach(li => {
          if (li.joiningStatus === 1) {
            this.will++;
          } else if (li.joiningStatus === 2) {
            this.maybe++;
          } else {
            this.wont++;
          }
        });
        this.associateChartData.push(this.will);
        this.associateChartData.push(this.maybe);
        this.associateChartData.push(this.wont);
      },
      error: err => this.errorMessage = err
    });
    this.will = 0;
    this.maybe = 0;
    this.wont = 0;
  }

}
