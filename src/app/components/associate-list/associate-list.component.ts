import { Component, OnInit } from '@angular/core';
import {AssociateService} from "../../services/associate.service";
import {Associate} from "../../entity/associate";
import {SchedulerService} from "../../services/scheduler.service";
import {Invite} from "../../entity/invite";
import {Router} from "@angular/router";

@Component({
  selector: 'app-associate-list',
  templateUrl: './associate-list.component.html',
  styleUrls: ['./associate-list.component.css']
})
export class AssociateListComponent implements OnInit {

  constructor(private associateService: AssociateService,
              private router: Router) { }

  associates: Associate[];

  ngOnInit(): void {
    this.getAllAssociates()
  }

  private getAllAssociates(): void {
    this.associateService.getAllAssociates().subscribe((response) => {
      this.associates = response
    }, (error) => {
      alert(error)
    })
  }

  public buddyConnect(associate: Associate): void {
    let contacter = {
      inviter_email: associate.buddyEmail,
      email: associate.email
    }
    this.router.navigate(['/add-schedule'], { queryParams: contacter})
  }

  public hmConnect(associate: Associate): void {
    let contacter = {
      inviter_email: associate.hmEmail,
      email: associate.email
    }
    this.router.navigate(['/add-schedule'], { queryParams: contacter})
  }

}
