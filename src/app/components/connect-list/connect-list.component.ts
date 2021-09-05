import { Component, OnInit } from '@angular/core';
import {SchedulerService} from "../../services/scheduler.service";
import {Invite} from "../../entity/invite";
import {Schedule} from "../../entity/schedule";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-connect-list',
  templateUrl: './connect-list.component.html',
  styleUrls: ['./connect-list.component.css']
})
export class ConnectListComponent implements OnInit {

  constructor(private schedulerService: SchedulerService) { }

  form: boolean = false;
  feedback: string;

  ngOnInit(): void {
    this.getAllInvites()
  }

  schedules: Schedule[];

  private getAllInvites(): void {
    this.schedulerService.getAllSchedules().subscribe((res) => {
      this.schedules = res
    }, (error) => {
      alert(error)
    })
  }

  public deleteSchedule(jobId: string): void {
    this.schedulerService.deleteSchedule(jobId).subscribe((res) => {
      this.schedules = this.schedules.filter(i => i.schedule.key !== jobId)
      console.log(res)
      alert('schedule has been deleted')
    }, (error) => {
      alert(error.message)
    })
  }

  public giveFeedback(schedule: Schedule) {
    if (this.form) {
      this.schedulerService.giveFeedback(schedule.connect.id, this.feedback).subscribe((res) => {
        console.log(res)
        alert('feedback added')
        this.getAllInvites()
      }, (error) => {
        alert(error)
      })
    }
    this.form = !this.form
  }

}
