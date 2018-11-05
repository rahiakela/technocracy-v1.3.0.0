import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogViewComponent} from './containers/blog-view/blog-view.component';
import {WriteBlogComponent} from './containers/write-blog/write-blog.component';
import {MyBlogComponent} from './containers/my-blog/my-blog.component';
import {PendingBlogComponent} from './containers/pending-blog/pending-blog.component';
import {AuthenticationGuard} from '../core/services/authentication.guard';
import {BlogPreviewComponent} from './containers/blog-preview/blog-preview.component';
import {EditBlogComponent} from "./containers/edit-blog/edit-blog.component";

const routes: Routes = [
  {path: '', redirectTo: ':id', pathMatch: 'full'},
  {path: ':id', component: BlogViewComponent },
  {path: 'write/new', component: WriteBlogComponent, canActivate: [AuthenticationGuard]},
  {path: 'list/view', component: MyBlogComponent, canActivate: [AuthenticationGuard]},
  {path: 'preview/:id', component: BlogPreviewComponent},
  {path: 'edit/:id', component: EditBlogComponent},
  {path: 'pending/view', component: PendingBlogComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
