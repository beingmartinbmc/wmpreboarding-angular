import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Invite} from '../entity/Invite';
import {InviteService} from '../services/invite.service';
import {InvitesTableDataSource} from './invites-table-datasource';
import {FeedbackComponent} from '../modals/feedback/feedback.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-invites-table',
  templateUrl: './invites-table.component.html',
  styleUrls: ['./invites-table.component.css']
})
export class InvitesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Invite>;
  dataSource: InvitesTableDataSource;
  dataLength: number;
  errorMessage: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'inviterEmail', 'joiningDate', 'feedback'];

  constructor(private inviteService: InviteService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new InvitesTableDataSource(this.inviteService);
    this.inviteService.getOrderCount().subscribe({
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '70vw',
      maxWidth: '70vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result.feedback);
      console.log('The dialog was closed', result);
    });
  }
}
