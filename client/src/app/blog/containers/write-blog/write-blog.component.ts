import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../../root-store';
import {BlogActions, BlogSelectors} from '../../../root-store/blog-store';
import {AuthSelectors} from '../../../root-store/auth-store';
import {User} from '../../../shared/models/user-model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'tech-write-blog-container',
  template: `
    <tech-write-blog
      [loading]="loading | async"
      [loaded]="loaded | async"
      [error]="error | async"
      (onBlogActionTriggered)="blogActionHandler($event)">
    </tech-write-blog>
  `,
  styles: []
})
export class WriteBlogComponent implements OnInit {

  authenticatedUser: User;

  public loading: Observable<boolean>;
  public loaded: Observable<boolean>;
  public error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>, private router: Router) {

  }

  ngOnInit() {
    // get blog isLoading from store
    this.loading = this.store$.pipe(select(BlogSelectors.selectBlogIsLoading));
    // get blog isLoaded from store
    this.loaded = this.store$.pipe(select(BlogSelectors.selectBlogIsLoaded));
    // get auth error from store
    this.error = this.store$.pipe(select(BlogSelectors.selectBlogError));
    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);

    // forward the user to profile page if did not created profile
    if (this.authenticatedUser !== null && this.authenticatedUser.profile === null) {
      this.router.navigate(['/profile']);
    }
  }

  // handle blog actions such as post, draft
  blogActionHandler(data: any) {
    const blog = {
      action : data.action,
      profileId: this.authenticatedUser.profile._id,
      title: data.title,
      content: data.content,
      tags: data.tags
    };
    this.store$.dispatch(new BlogActions.AddBlog({blog: blog}));
  }
}
