import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionViewContainerComponent} from './containers/question-view/question-view.component';
import {WriteQuestionComponent} from "./containers/write-question/write-question.component";
import {MyQuestionComponent} from "./containers/my-question/my-question.component";
import {AuthenticationGuard} from "../core/services/authentication.guard";
import {QuestionPreviewComponent} from "./containers/question-preview/question-preview.component";
import {EditQuestionComponent} from "./containers/edit-question/edit-question.component";
import {PendingQuestionComponent} from "./containers/pending-question/pending-question.component";
import {QuestionResolver} from './resolver/question-resolver';

const routes: Routes = [
  {path: '', redirectTo: ':id', pathMatch: 'full'},
  {path: ':id', component: QuestionViewContainerComponent, resolve: {question: QuestionResolver}},
  {path: 'write/new', component: WriteQuestionComponent, canActivate: [AuthenticationGuard]},
  {path: 'list/view', component: MyQuestionComponent, canActivate: [AuthenticationGuard]},
  {path: 'preview/:id/:type', component: QuestionPreviewComponent},
  {path: 'edit/:id', component: EditQuestionComponent},
  {path: 'pending/view', component: PendingQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
