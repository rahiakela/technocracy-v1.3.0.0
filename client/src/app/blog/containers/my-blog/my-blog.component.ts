import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user-model";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {BlogActions, BlogSelectors} from '../../../root-store/blog-store';
import {AuthSelectors} from '../../../root-store/auth-store';
import {Router} from "@angular/router";
import {Blog} from "../../../shared/models/blog-model";

@Component({
  selector: 'tech-my-blog-container',
  template: `
    <tech-my-blog
        [blogList]="blogList$ | async"
        [loading]="loading$ | async"
        (onBlogActionTriggered)="blogActionHandler($event)"
        >
      
    </tech-my-blog>
  `,
  styles: []
})
export class MyBlogComponent implements OnInit {

  authenticatedUser: User;
  public blogList$: Observable<Blog[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>, private router: Router) { }

  ngOnInit() {
    // get blog isLoading from store
    this.loading$ = this.store$.pipe(select(BlogSelectors.selectBlogIsLoading));
    // get blog isLoaded from store
    this.loaded$ = this.store$.pipe(select(BlogSelectors.selectBlogIsLoaded));
    // get auth error from store
    this.error$ = this.store$.pipe(select(BlogSelectors.selectBlogError));
    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);
    // select blog list that are written by authenticated user
    this.blogList$ = this.store$.pipe(select(BlogSelectors.selectBlogListWrittenByAuthor));

    // forward the user to profile page if did not created profile
    if (this.authenticatedUser !== null && this.authenticatedUser.profile === null) {
      this.router.navigate(['/profile']);
    }

    // load blog list written by author
    this.store$.dispatch(new BlogActions.LoadBlogListByAuthor({writtenBy: this.authenticatedUser.profile._id}));
  }

  // handle blog actions such as post and delete
  blogActionHandler(data : any) {
    switch (data.action) {
      case 'post':
        this.store$.dispatch(new BlogActions.ModifyBlog({data: {blogId: data.blogId, actionType: 'pending'}}));
        break;
      case 'delete':
        this.store$.dispatch(new BlogActions.RemoveBlog({blogId: data.blogId}));
        break;
    }
  }

}
