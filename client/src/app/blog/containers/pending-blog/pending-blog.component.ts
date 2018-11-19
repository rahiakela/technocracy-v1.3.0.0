import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {BlogActions, BlogSelectors} from '../../../root-store/blog-store';
import {Blog} from "../../../shared/models/blog-model";

@Component({
  selector: 'tech-pending-blog-container',
  template: `
    <tech-pending-blog
      [blogList]="blogList$ | async"
      [loading]="loading$ | async"
      (onBlogActionTriggered)="blogActionHandler($event)"
    >
    </tech-pending-blog>
  `,
  styles: []
})
export class PendingBlogComponent implements OnInit {

  blogList$: Observable<Blog[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    // get blog isLoading from store
    this.loading$ = this.store$.pipe(select(BlogSelectors.selectBlogIsLoading));
    // get blog isLoaded from store
    this.loaded$ = this.store$.pipe(select(BlogSelectors.selectBlogIsLoaded));
    // get auth error from store
    this.error$ = this.store$.pipe(select(BlogSelectors.selectBlogError));
    // select pending blog list for approval that are written by author
    this.blogList$ = this.store$.pipe(select(BlogSelectors.selectPendingBlogList));

    // load pending blog list for approval
    this.store$.dispatch(new BlogActions.LoadPendingBlogList());
  }

  // handle blog actions such as publish, on hold and reject
  blogActionHandler(data : any) {
    this.store$.dispatch(new BlogActions.ModifyBlog({data}));
  }
}
