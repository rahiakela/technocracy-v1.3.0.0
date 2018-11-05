import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {HomeContainerComponent} from './core/home/home-container.component';
import {LoginComponent} from "./core/auth/login/login.component";
import {SignupComponent} from "./core/auth/signup/signup.component";
import {ForgotPassComponent} from "./core/auth/forgot-pass/forgot-pass.component";
import {AccountVerificationComponent} from "./core/auth/account-verification/account-verification.component";
import {AccountActivateComponent} from "./core/auth/account-activate/account-activate.component";
import {ResetPassComponent} from "./core/auth/reset-pass/reset-pass.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeContainerComponent},
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'account/verify', component: AccountVerificationComponent },
  {path: 'account/activated', component: AccountActivateComponent },
  {path: 'account/forgot/pass', component: ForgotPassComponent },
  {path: 'account/reset/pass', component: ResetPassComponent },
  {path: 'blog', loadChildren: './blog/blog.module#BlogModule'}, //lazy load blog module
  {path: 'question', loadChildren: './question/question.module#QuestionModule'}, //lazy load question module
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'}, //lazy load profile module
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
