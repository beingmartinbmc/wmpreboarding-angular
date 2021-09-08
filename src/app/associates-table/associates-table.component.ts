import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AssociatesTableDataSource} from './associates-table-datasource';
import {AssociateService} from '../services/associate.service';
import {Associate} from '../entity/associate';

@Component({
  selector: 'app-associates-table',
  templateUrl: './associates-table.component.html',
  styleUrls: ['./associates-table.component.css']
})
export class AssociatesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Associate>;
  dataSource: AssociatesTableDataSource;
  dataLength: number;
  errorMessage: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns = [
    'id',
    'name',
    'email',
    'hmEmail',
    'joiningDate',
    'joiningStatus'
  ];

  constructor(private associateService: AssociateService) {
  }

  ngOnInit() {
    this.dataSource = new AssociatesTableDataSource(this.associateService);
    this.associateService.getOrderCount().subscribe({
      next: orderCount => {
        this.dataLength = orderCount;
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
