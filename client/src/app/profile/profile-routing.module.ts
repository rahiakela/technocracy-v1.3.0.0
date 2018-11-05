import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./containers/profile/profile.component";
import {AuthenticationGuard} from "../core/services/authentication.guard";

const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: '', redirectTo: ':id', pathMatch: 'full'},
  {path: ':id', component: ProfileComponent, canActivate: [AuthenticationGuard]}, // canActivate: [AuthenticationGuard]
  {path: 'view/:id', redirectTo: ':id', pathMatch: 'full'},
  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
