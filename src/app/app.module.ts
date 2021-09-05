import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AssociateListComponent } from './components/associate-list/associate-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import {RouterModule} from "@angular/router";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ConnectListComponent } from './components/connect-list/connect-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    AssociateListComponent,
    AddScheduleComponent,
    ConnectListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'associates', component: AssociateListComponent},
      {path: '', redirectTo: 'associates', pathMatch: 'full'},
      {path: 'add-schedule', component: AddScheduleComponent},
      {path: 'schedules', component: ConnectListComponent}
    ]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
