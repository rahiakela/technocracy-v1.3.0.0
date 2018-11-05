import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Blog} from '../../shared/models/blog-model';
import {select, Store} from "@ngrx/store";
import * as RootStoreState from "../../root-store/root-state";
import {BlogActions, BlogSelectors} from '../../root-store/blog-store';
import {Observable} from 'rxjs';

@Component({
  selector: 'tech-home-container',
  template: `<tech-home [blogs]="blogs$ | async" [searching]="loading$ | async" [error]="error$ | async"></tech-home>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {

  blogs$: Observable<Blog[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store$: Store<RootStoreState.State>) {
    this.blogs$ = store$.pipe(select(BlogSelectors.selectAllBlog));
    // fetch leading and error
    this.loading$ = store$.pipe(select(BlogSelectors.selectBlogIsLoading));
    this.error$ = store$.pipe(select(BlogSelectors.selectBlogError));
  }

  ngOnInit() {
    this.store$.dispatch(new BlogActions.LoadBlogList());
  }

}
