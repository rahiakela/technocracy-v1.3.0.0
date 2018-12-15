import {Injectable} from '@angular/core';
import {BlogService} from '../../core/services/blog.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {asyncScheduler, Observable, empty, of as observableOf} from 'rxjs';
import {Action} from '@ngrx/store';
import * as BlogActions from './blog-actions';
import * as BlogSelectors from './blog-selectors';
import {startWith, switchMap, map, catchError, debounceTime, skip, takeUntil} from 'rxjs/operators';
import {Blog} from '../../shared/models/blog-model';

/**
 * Effects offer a way to isolate and easily test side-effects within your application.
 */
@Injectable()
export class BlogEffects {

  constructor(private blogService: BlogService, private actions$: Actions) {}

  @Effect()
  loadBlogList$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LoadBlogList>(BlogActions.ActionTypes.LOAD_BLOG_LIST),
    startWith(new BlogActions.LoadBlogList()),
    switchMap(
      action => this.blogService
        .getBlogs(0)
        .pipe(
          map(blogs => new BlogActions.LoadBlogListSuccess({blogs})),
          catchError((error: any) => observableOf(new BlogActions.LoadBlogListFailure({error})))
        )
    )
  );

  @Effect()
  loadBlog$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LoadBlog>(BlogActions.ActionTypes.LOAD_BLOG),
    map(action => action.payload.blogId),
    switchMap(blogId => {
        // initially check this blog exists in store otherwise fetch from REST API
        const blog: Blog = <Blog>BlogSelectors.selectBlogById;
        if (blog === null) {
          return this.blogService
            .loadBlog(blogId)
            .pipe(
              map(result => new BlogActions.LoadBlogSuccess({blog: result})),
              catchError(error => observableOf(new BlogActions.LoadBlogFailure({error})))
            );
        } else {
          return observableOf(new BlogActions.LoadBlogSuccess({blog: blog}));
        }
      }
    )
  );

  @Effect()
  loadBlogListByAuthor$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LoadBlogListByAuthor>(BlogActions.ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR),
    map(action => action.payload.writtenBy),
    switchMap(writtenBy =>
      this.blogService
        .loadBlogListWrittenByAuthor(writtenBy)
        .pipe(
          map(blogs => new BlogActions.LoadBlogListByAuthorSuccess({blogs})),
          catchError(error => observableOf(new BlogActions.LoadBlogListByAuthorFailure({error})))
        )
    )
  );

  @Effect()
  loadPendingBlogList$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LoadPendingBlogList>(BlogActions.ActionTypes.LOAD_PENDING_BLOG_LIST),
    switchMap(() =>
      this.blogService
        .loadPendingBlogList()
        .pipe(
          map(blogs => new BlogActions.LoadPendingBlogListSuccess({blogs})),
          catchError(error => observableOf(new BlogActions.LoadPendingBlogListFailure({error})))
        )
    )
  );

  @Effect()
  addBlog$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.AddBlog>(BlogActions.ActionTypes.ADD_BLOG),
    switchMap(action =>
      this.blogService
        .addBlog(action.payload.blog)
        .pipe(
          map(blog => new BlogActions.AddBlogSuccess({blog: blog})),
          catchError(error => observableOf(new BlogActions.AddBlogFailure({error})))
        )
    )
  );

  @Effect()
  modifyBlog$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.ModifyBlog>(BlogActions.ActionTypes.MODIFY_BLOG),
    switchMap(action =>
      this.blogService
        .modifyBlog(action.payload.data.blogId, action.payload.data.action)
        .pipe(
          map(blog => new BlogActions.ModifyBlogSuccess({blog: blog})),
          catchError(error => observableOf(new BlogActions.ModifyBlogFailure({error})))
        )
    )
  );

  @Effect()
  editBlog$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.EditBlog>(BlogActions.ActionTypes.EDIT_BLOG),
    switchMap(action =>
      this.blogService
        .editBlog(action.payload.blogId, action.payload.blog)
        .pipe(
          map(blog => new BlogActions.EditBlogSuccess({blog: blog})),
          catchError((error: any) => observableOf(new BlogActions.EditBlogFailure({error})))
        )
    )
  );

  @Effect()
  removeBlog$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.RemoveBlog>(BlogActions.ActionTypes.REMOVE_BLOG),
    switchMap(action =>
      this.blogService
        .deleteBlog(action.payload.blogId)
        .pipe(
          map(blog => new BlogActions.RemoveBlogSuccess({blog: blog})),
          catchError(error => observableOf(new BlogActions.RemoveBlogFailure({error})))
        )
    )
  );

  @Effect()
  likeBlog$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LikeBlog>(BlogActions.ActionTypes.LIKE_BLOG),
    switchMap(action =>
      this.blogService.like(action.payload.blogId, action.payload.likedBy)
        .pipe(
          map(blog => new BlogActions.LikeBlogSuccess({blog: blog})),
          catchError(error => observableOf(new BlogActions.LikeBlogFailure({error})))
        )
    )
  );

  @Effect()
  likeComment: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LikeComment>(BlogActions.ActionTypes.LIKE_COMMENT),
    switchMap(action =>
      this.blogService.likeComment(action.payload.commentId, action.payload.likedBy)
        .pipe(
          map(comment => new BlogActions.LikeCommentSuccess({blogId: action.payload.blogId, comment: comment})),
          catchError(error => observableOf(new BlogActions.LikeCommentFailure({error})))
        )
    )
  );

  @Effect()
  addComment: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.AddComment>(BlogActions.ActionTypes.ADD_COMMENT),
    switchMap(action =>
      this.blogService.addComment(action.payload.blogId, action.payload.commentedBy, action.payload.content, action.payload.notification)
        .pipe(
          map(blog => new BlogActions.AddCommentSuccess({blog: blog})),
          catchError(error => observableOf(new BlogActions.AddCommentFailure({error})))
        )
    )
  );

  @Effect()
  editComment: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.UpdateComment>(BlogActions.ActionTypes.UPDATE_COMMENT),
    switchMap(action =>
      this.blogService.editCommentReply(action.payload.commentId, 'comment', action.payload.content)
        .pipe(
          map(comment => new BlogActions.UpdateCommentSuccess({blogId: action.payload.blogId, comment: comment})),
          catchError(error => observableOf(new BlogActions.UpdateCommentFailure({error})))
        )
    )
  );

  @Effect()
  deleteComment: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.DeleteComment>(BlogActions.ActionTypes.DELETE_COMMENT),
    switchMap(action =>
      this.blogService.deleteComment(action.payload.commentId)
        .pipe(
          map(isDeleted => new BlogActions.DeleteCommentSuccess({blogId: action.payload.blogId, commentId: action.payload.commentId})),
          catchError(error => observableOf(new BlogActions.DeleteCommentFailure({error})))
        )
    )
  );

  @Effect()
  likeReply: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.LikeReply>(BlogActions.ActionTypes.LIKE_REPLY),
    switchMap(action =>
      this.blogService.likeReply(action.payload.replyId, action.payload.likedBy)
        .pipe(
          map(reply => new BlogActions.LikeReplySuccess({blogId: action.payload.blogId, reply: reply})),
          catchError(error => observableOf(new BlogActions.LikeReplyFailure({error})))
        )
    )
  );

  @Effect()
  addReply: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.AddReply>(BlogActions.ActionTypes.ADD_REPLY),
    switchMap(action => {
      if (action.payload.content === '') {
        return empty();
      }

      return this.blogService.addReply(action.payload.blogId, action.payload.commentId, action.payload.repliedBy, action.payload.content)
        .pipe(
          map(comment => new BlogActions.AddReplySuccess({blogId: action.payload.blogId, comment: comment})),
          catchError(error => observableOf(new BlogActions.AddReplyFailure({error})))
        );
    })
  );

  @Effect()
  editReply: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.UpdateReply>(BlogActions.ActionTypes.UPDATE_REPLY),
    switchMap(action =>
      this.blogService.editCommentReply(action.payload.replyId , 'reply', action.payload.content)
        .pipe(
          map(reply => new BlogActions.UpdateReplySuccess({blogId: action.payload.blogId, reply: reply})),
          catchError(error => observableOf(new BlogActions.UpdateReplyFailure({error})))
        )
    )
  );

  @Effect()
  deleteReply: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.DeleteReply>(BlogActions.ActionTypes.DELETE_REPLY),
    switchMap(action =>
      this.blogService.deleteReply(action.payload.replyId)
        .pipe(
          map(isDeleted => new BlogActions.DeleteReplySuccess({
            blogId: action.payload.blogId,
            replyId: action.payload.replyId
          })),
          catchError(error => observableOf(new BlogActions.DeleteReplyFailure({error})))
        )
    )
  );

  @Effect()
  getRelatedBlogList$: Observable<Action> = this.actions$.pipe(
    ofType<BlogActions.GetRelatedBlog>(BlogActions.ActionTypes.GET_RELATED_BLOG),
    map(action => action.payload.title),
    switchMap(title =>
      this.blogService
        .getRelatedBlog(title)
        .pipe(
          map(blogs => new BlogActions.GetRelatedBlogSuccess({predictedBlogs: blogs})),
          catchError((error: any) => observableOf(new BlogActions.GetRelatedBlogFailure({error})))
        )
    )
  );

  @Effect()
  searchBlog$ = ({debounce = 300, scheduler = asyncScheduler} = {}): Observable<Action> => this.actions$
    .pipe(
      ofType<BlogActions.SearchBlog>(BlogActions.ActionTypes.SEARCH_BLOG),
      debounceTime(debounce, scheduler),
      map(action => action.payload.query),
      switchMap(query => {
          if (query === '') {
            return empty();
          }

          const nextSearch$ = this.actions$.pipe(
            ofType(BlogActions.ActionTypes.SEARCH_BLOG),
            skip(1)
          );

          return this.blogService.searchBlog(query).pipe(
            takeUntil(nextSearch$),
            map((blogs: Blog[]) => new BlogActions.SearchBlogSuccess({filteredBlogs: blogs})),
            catchError(err => observableOf(new BlogActions.SearchBlogFailure(err)))
          );
        }
      )
    )
}

