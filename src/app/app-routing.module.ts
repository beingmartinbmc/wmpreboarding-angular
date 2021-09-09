import {DashComponent} from './dash/dash.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvitesComponent} from './invites/invites.component';


const routes: Routes = [
  {path: 'dashboard', component: DashComponent},
  {path: 'invitations', component: InvitesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
