import {Component, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Blog} from '../../../shared/models/blog-model';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../../root-store';
import {BlogSelectors, BlogActions} from '../../../root-store/blog-store';
import {AuthSelectors} from '../../../root-store/auth-store';
import {ActivatedRoute} from '@angular/router';
import {User} from "../../../shared/models/user-model";

@Component({
  selector: 'tech-blog-view-container',
  template: `
    <tech-blog-view 
      [blog]="blog$ | async"
      (onBlogActionTriggered)="blogActionHandler($event)"
    >
    </tech-blog-view>
  `,
  styles: []
})
export class BlogViewComponent implements OnInit, OnChanges {
  blog$: Observable<Blog>;

  blogId: string;
  authenticatedUser: User;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get blog id from route
      this.blogId = params['id'];
      // dispatch load blog action using blog id
      this.store$.dispatch(new BlogActions.LoadBlog({blogId: this.blogId}));
    });
  }

  ngOnInit() {
    // select blog using blog id
    this.blog$ = this.store$.pipe(select(BlogSelectors.selectBlogById));

    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);
  }

  ngOnChanges() {
    // select blog using blog id
    this.blog$ = this.store$.pipe(select(BlogSelectors.selectBlogById));
  }

  // handle blog actions such as like, comment and reply and dispatch action to store
  blogActionHandler(data : any) {
    switch (data.action) {

      case 'like' :
        this.store$.dispatch(new BlogActions.LikeBlog({
          blogId: this.blogId,
          likedBy: this.authenticatedUser._id
        }));
        break;

      case 'comment' :
        this.store$.dispatch(new BlogActions.AddComment({
          blogId: this.blogId,
          commentedBy: this.authenticatedUser._id,
          content: data.content,
          notification: data.notification
        }));
        break;

      case 'comment-edit' :
        this.store$.dispatch(new BlogActions.UpdateComment({
          blogId: this.blogId,
          commentId: data.commentId,
          content: data.content
        }));
        break;

      case 'comment-delete' :
        this.store$.dispatch(new BlogActions.DeleteComment({
          blogId: this.blogId,
          commentId: data.commentId
        }));
        break;

      case 'reply':
        this.store$.dispatch(new BlogActions.AddReply({
          blogId: this.blogId,
          commentId: data.commentId,
          repliedBy: this.authenticatedUser._id,
          content: data.content
        }));
        break;

      case 'reply-edit':
        this.store$.dispatch(new BlogActions.UpdateReply({
          blogId: this.blogId,
          replyId: data.replyId,
          content: data.content
        }));
        break;

      case 'reply-delete':
        this.store$.dispatch(new BlogActions.DeleteReply({
          blogId: this.blogId,
          commentId: data.commentId,
          replyId: data.replyId
        }));
        break;

      case 'comment-like':
        this.store$.dispatch(new BlogActions.LikeComment({
          blogId: this.blogId,
          commentId: data.commentId,
          likedBy: this.authenticatedUser._id
        }));
        break;

      case 'reply-like':
        this.store$.dispatch(new BlogActions.LikeReply({
          blogId: this.blogId,
          commentId: data.commentId,
          replyId: data.replyId,
          likedBy: this.authenticatedUser._id
        }));
        break;
    }
  }
}
