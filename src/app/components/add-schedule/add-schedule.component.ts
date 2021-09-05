import {Component, OnInit} from '@angular/core';
import {SchedulerService} from "../../services/scheduler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Invite} from "../../entity/invite";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  body: string
  subject: string
  timestamp: Date = new Date();

  constructor(private schedulerService: SchedulerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  private createSchedule(params: any): void {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.timestamp, 'yyyy-MM-dd hh-mm-ss a')
    const invite: Invite = {
      email: params.get('email'),
      subject: this.subject,
      body: this.body,
      inviterEmail: params.get('inviter_email'),
      timestamp: formattedDate
    }
    console.log(invite)
    console.log(formattedDate)
    this.schedulerService.scheduleInvite(invite).subscribe((data) => {
      alert(data.schedule.key + " has been added")
      this.router.navigate(['/schedules'])
    }, (error) => {
      alert(error);
    })

  }

  public onSubmit(): void {
    const params = this.route.snapshot.queryParamMap
    console.log(params)
    this.createSchedule(params);
  }

}
