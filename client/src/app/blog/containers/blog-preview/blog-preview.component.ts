import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {BlogActions, BlogSelectors} from '../../../root-store/blog-store';
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../../shared/models/blog-model";

@Component({
  selector: 'tech-blog-preview-container',
  template: `
    <tech-blog-preview [blog]="blog" (onBlogActionTriggered)="blogActionHandler($event)"></tech-blog-preview>
  `,
  styles: []
})
export class BlogPreviewComponent implements OnInit {

  public blog: Blog;

  blogId: string;
  previewType: string;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get blog id from route
      this.blogId = params['id'];
      this.previewType = params['type'];
      // dispatch blog preview action using blog id
      this.store$.dispatch(new BlogActions.PreviewBlog({blogId: this.blogId}));
    });
  }

  ngOnInit() {
    // get selected blog review using blog id based on preview type
    if (this.blogId) {
      switch (this.previewType) {
        case 'my-blog':
          this.store$.pipe(select(BlogSelectors.selectBlogListWrittenByAuthor))
            .subscribe(blogList => {
              this.blog = Object.values(blogList).find(blog => blog._id === this.blogId);
            });
          break;
        case 'pending':
          this.store$.pipe(select(BlogSelectors.selectPendingBlogList))
            .subscribe(pendingBlogList => {
              this.blog = Object.values(pendingBlogList).find(blog => blog._id === this.blogId);
            });
          break;
      }
    }
  }

  // handle blog actions such as post and delete
  blogActionHandler(data : any) {
    this.store$.dispatch(new BlogActions.ModifyBlog({data: {blogId: data.blogId, action: 'pending'}}));
  }
}
