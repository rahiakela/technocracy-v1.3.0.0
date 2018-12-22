import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../../root-store';
import {BlogActions, BlogSelectors} from '../../../root-store/blog-store';
import {AuthSelectors} from '../../../root-store/auth-store';
import {ActivatedRoute} from '@angular/router';
import {Blog} from '../../../shared/models/blog-model';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/user-model';

@Component({
  selector: 'tech-edit-blog-container',
  template: `
    <tech-edit-blog
      [blog]="blog"
      [loading]="loading | async"
      [loaded]="loaded | async"
      [error]="error | async"
      (onBlogActionTriggered)="blogActionHandler($event)">

    </tech-edit-blog>
  `,
  styles: []
})
export class EditBlogComponent implements OnInit {

  blog: Blog;
  authenticatedUser: User;
  loading: Observable<boolean>;
  loaded: Observable<boolean>;
  error: Observable<any>;

  blogId: string;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get blog id from route
      this.blogId = params['id'];
      // dispatch blog preview action using blog id
      this.store$.dispatch(new BlogActions.PreviewBlog({blogId: this.blogId}));
    });
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

    // get selected blog review using blog id
    if (this.blogId) {
      this.store$.pipe(select(BlogSelectors.selectBlogListWrittenByAuthor))
        .subscribe(blogList => {
          this.blog = Object.values(blogList).find(blog => blog._id === this.blogId);
        });
    }
  }

  // handle blog actions such as post, draft
  blogActionHandler(data: any) {
    const blog = {
      blogId: this.blogId,
      title: data.title,
      content: data.content,
      tags: data.tags
    };
    this.store$.dispatch(new BlogActions.EditBlog({blogId: blog.blogId, blog: blog}));
  }

}
