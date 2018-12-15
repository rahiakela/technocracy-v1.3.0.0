import {Action} from '@ngrx/store';
import {Blog} from '../../shared/models/blog-model';
import {Comment, Reply} from '../../shared/models/comment-model';

export enum ActionTypes {
  LOAD_BLOG_LIST          = '[Blog] Load Blog List',
  LOAD_BLOG_LIST_FAILURE  = '[Blog] Load Blog List Failure',
  LOAD_BLOG_LIST_SUCCESS  = '[Blog] Load Blog List Success',

  LOAD_BLOG               = '[Blog] Load Blog',
  LOAD_BLOG_FAILURE       = '[Blog] Load Blog Failure',
  LOAD_BLOG_SUCCESS       = '[Blog] Load Blog Success',

  LOAD_BLOG_LIST_BY_AUTHOR          = '[Blog] Load Blog List Written by Author',
  LOAD_BLOG_LIST_BY_AUTHOR_FAILURE  = '[Blog] Load Blog List Written by Author Failure',
  LOAD_BLOG_LIST_BY_AUTHOR_SUCCESS  = '[Blog] Load Blog List Written by Author Success',

  LOAD_PENDING_BLOG_LIST          = '[Blog] Load Pending Blog List',
  LOAD_PENDING_BLOG_LIST_FAILURE  = '[Blog] Load Pending Blog List Failure',
  LOAD_PENDING_BLOG_LIST_SUCCESS  = '[Blog] Load Pending Blog List Success',

  ADD_BLOG                = '[Blog] Add Blog',
  ADD_BLOG_FAILURE        = '[Blog] Add Blog Failure',
  ADD_BLOG_SUCCESS        = '[Blog] Add Blog Success',

  MODIFY_BLOG             = '[Blog] Modify Blog',
  MODIFY_BLOG_FAILURE     = '[Blog] Modify Blog Failure',
  MODIFY_BLOG_SUCCESS     = '[Blog] Modify Blog Success',

  PREVIEW_BLOG             = '[Blog] Preview Blog',
  PREVIEW_BLOG_FAILURE     = '[Blog] Preview Blog Failure',
  PREVIEW_BLOG_SUCCESS     = '[Blog] Preview Blog Success',

  EDIT_BLOG               = '[Blog] Edit Blog',
  EDIT_BLOG_FAILURE       = '[Blog] Edit Blog Failure',
  EDIT_BLOG_SUCCESS       = '[Blog] Edit Blog Success',

  REMOVE_BLOG             = '[Blog] Remove Blog',
  REMOVE_BLOG_FAILURE     = '[Blog] Remove Blog Failure',
  REMOVE_BLOG_SUCCESS     = '[Blog] Remove Blog Success',

  SEARCH_BLOG             = '[Blog] Search Blog',
  SEARCH_BLOG_FAILURE     = '[Blog] Search Blog Failure',
  SEARCH_BLOG_SUCCESS     = '[Blog] Search Blog Success',

  GET_RELATED_BLOG             = '[Blog] Get Related Blog',
  GET_RELATED_BLOG_FAILURE     = '[Blog] Get Related Blog Failure',
  GET_RELATED_BLOG_SUCCESS     = '[Blog] Get Related Blog Success',

  LIKE_BLOG               = '[Blog] Like Blog',
  LIKE_BLOG_FAILURE       = '[Blog] Like Blog Failure',
  LIKE_BLOG_SUCCESS       = '[Blog] Like Blog Success',

  LIKE_COMMENT            = '[Blog] Like Comment',
  LIKE_COMMENT_FAILURE    = '[Blog] Like Comment Failure',
  LIKE_COMMENT_SUCCESS    = '[Blog] Like Comment Success',

  LIKE_REPLY              = '[Blog] Like Reply',
  LIKE_REPLY_FAILURE      = '[Blog] Like Reply Failure',
  LIKE_REPLY_SUCCESS      = '[Blog] Like Reply Success',

  ADD_COMMENT             = '[Blog] Add Comment',
  ADD_COMMENT_FAILURE     = '[Blog] Add Comment Failure',
  ADD_COMMENT_SUCCESS     = '[Blog] Add Comment Success',

  ADD_REPLY               = '[Blog] Add Reply',
  ADD_REPLY_FAILURE       = '[Blog] Add Reply Failure',
  ADD_REPLY_SUCCESS       = '[Blog] Add Reply Success',

  UPDATE_COMMENT          = '[Blog] Update Comment',
  UPDATE_COMMENT_FAILURE  = '[Blog] Update Comment Failure',
  UPDATE_COMMENT_SUCCESS  = '[Blog] Update Comment Success',

  UPDATE_REPLY            = '[Blog] Update Reply',
  UPDATE_REPLY_FAILURE    = '[Blog] Update Reply Failure',
  UPDATE_REPLY_SUCCESS    = '[Blog] Update Reply Success',

  DELETE_COMMENT          = '[Blog] Delete Comment',
  DELETE_COMMENT_FAILURE  = '[Blog] Delete Comment Failure',
  DELETE_COMMENT_SUCCESS  = '[Blog] Delete Comment Success',

  DELETE_REPLY            = '[Blog] Delete Reply',
  DELETE_REPLY_FAILURE    = '[Blog] Delete Reply Failure',
  DELETE_REPLY_SUCCESS    = '[Blog] Delete Reply Success',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadBlogList  implements Action {
  readonly type = ActionTypes.LOAD_BLOG_LIST;
}
export class LoadBlogListFailure implements Action {
  readonly type = ActionTypes.LOAD_BLOG_LIST_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class LoadBlogListSuccess implements Action {
  readonly type = ActionTypes.LOAD_BLOG_LIST_SUCCESS;

  constructor(public payload: {blogs: Blog[]}) {}
}

export class LoadBlog  implements Action {
  readonly type = ActionTypes.LOAD_BLOG;

  constructor(public payload: {blogId: string}) {}
}
export class LoadBlogFailure implements Action {
  readonly type = ActionTypes.LOAD_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class LoadBlogSuccess implements Action {
  readonly type = ActionTypes.LOAD_BLOG_SUCCESS;

  constructor(public payload: { blog: Blog}) {}
}

export class LoadBlogListByAuthor  implements Action {
  readonly type = ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR;
  constructor(public payload: {writtenBy: string}) {}
}
export class LoadBlogListByAuthorFailure implements Action {
  readonly type = ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class LoadBlogListByAuthorSuccess implements Action {
  readonly type = ActionTypes.LOAD_BLOG_LIST_BY_AUTHOR_SUCCESS;

  constructor(public payload: {blogs: Blog[]}) {}
}

export class LoadPendingBlogList  implements Action {
  readonly type = ActionTypes.LOAD_PENDING_BLOG_LIST;
}
export class LoadPendingBlogListFailure implements Action {
  readonly type = ActionTypes.LOAD_PENDING_BLOG_LIST_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class LoadPendingBlogListSuccess implements Action {
  readonly type = ActionTypes.LOAD_PENDING_BLOG_LIST_SUCCESS;

  constructor(public payload: {blogs: Blog[]}) {}
}

export class AddBlog  implements Action {
  readonly type = ActionTypes.ADD_BLOG;

  constructor(public payload: {blog: any}) {}
}
export class AddBlogFailure implements Action {
  readonly type = ActionTypes.ADD_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class AddBlogSuccess implements Action {
  readonly type = ActionTypes.ADD_BLOG_SUCCESS;

  constructor(public payload: { blog: Blog}) {}
}

export class ModifyBlog  implements Action {
  readonly type = ActionTypes.MODIFY_BLOG;

  constructor(public payload: {data: any}) {}
}
export class ModifyBlogFailure implements Action {
  readonly type = ActionTypes.MODIFY_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class ModifyBlogSuccess implements Action {
  readonly type = ActionTypes.MODIFY_BLOG_SUCCESS;

  constructor(public payload: { blog: Blog}) {}
}

export class PreviewBlog  implements Action {
  readonly type = ActionTypes.PREVIEW_BLOG;

  constructor(public payload: {blogId: string}) {}
}
export class PreviewBlogFailure implements Action {
  readonly type = ActionTypes.PREVIEW_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class PreviewBlogSuccess implements Action {
  readonly type = ActionTypes.PREVIEW_BLOG_SUCCESS;

  constructor(public payload: { blog: Blog}) {}
}

export class EditBlog  implements Action {
  readonly type = ActionTypes.EDIT_BLOG;

  constructor(public payload: {blogId: string, blog: Blog}) {}
}
export class EditBlogFailure implements Action {
  readonly type = ActionTypes.EDIT_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class EditBlogSuccess implements Action {
  readonly type = ActionTypes.EDIT_BLOG_SUCCESS;

  constructor(public payload: { blog: Blog}) {}
}

export class RemoveBlog  implements Action {
  readonly type = ActionTypes.REMOVE_BLOG;

  constructor(public payload: {blogId: string}) {}
}
export class RemoveBlogFailure implements Action {
  readonly type = ActionTypes.REMOVE_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}
export class RemoveBlogSuccess implements Action {
  readonly type = ActionTypes.REMOVE_BLOG_SUCCESS;

  constructor(public payload: {blog: Blog}) {}
}

export class SearchBlog implements Action {
  readonly type = ActionTypes.SEARCH_BLOG;

  constructor(public payload: {query: string}) {}
}
export class SearchBlogSuccess implements Action {
  readonly type = ActionTypes.SEARCH_BLOG_SUCCESS;

  constructor(public payload: {filteredBlogs: Blog[]}) {}
}
export class SearchBlogFailure implements Action {
  readonly type = ActionTypes.SEARCH_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class GetRelatedBlog implements Action {
  readonly type = ActionTypes.GET_RELATED_BLOG;

  constructor(public payload: {title: string}) {}
}
export class GetRelatedBlogSuccess implements Action {
  readonly type = ActionTypes.GET_RELATED_BLOG_SUCCESS;

  constructor(public payload: {predictedBlogs: Blog[]}) {}
}
export class GetRelatedBlogFailure implements Action {
  readonly type = ActionTypes.GET_RELATED_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class LikeBlog implements Action {
  readonly type = ActionTypes.LIKE_BLOG;

  constructor(public payload: {blogId: string, likedBy: string}) {}
}
export class LikeBlogSuccess implements Action {
  readonly type = ActionTypes.LIKE_BLOG_SUCCESS;

  constructor(public payload: { blog: Blog}) {}
}
export class LikeBlogFailure implements Action {
  readonly type = ActionTypes.LIKE_BLOG_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class LikeComment implements Action {
  readonly type = ActionTypes.LIKE_COMMENT;

  constructor(public payload: {blogId: string, commentId: string, likedBy: string}) {}
}
export class LikeCommentSuccess implements Action {
  readonly type = ActionTypes.LIKE_COMMENT_SUCCESS;

  constructor(public payload: {blogId: string, comment: Comment}) {}
}
export class LikeCommentFailure implements Action {
  readonly type = ActionTypes.LIKE_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class LikeReply implements Action {
  readonly type = ActionTypes.LIKE_REPLY;

  constructor(public payload: {blogId: string, commentId: string, replyId: string, likedBy: string}) {}
}
export class LikeReplySuccess implements Action {
  readonly type = ActionTypes.LIKE_REPLY_SUCCESS;

  constructor(public payload: {blogId: string, reply: Reply}) {}
}
export class LikeReplyFailure implements Action {
  readonly type = ActionTypes.LIKE_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class AddComment implements Action {
  readonly type = ActionTypes.ADD_COMMENT;

  constructor(public payload: {blogId: string, commentedBy: string, content: string, notification: boolean}) {}
}
export class AddCommentSuccess implements Action {
  readonly type = ActionTypes.ADD_COMMENT_SUCCESS;

  constructor(public payload: {blog: Blog}) {}
}
export class AddCommentFailure implements Action {
  readonly type = ActionTypes.ADD_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class AddReply implements Action {
  readonly type = ActionTypes.ADD_REPLY;

  constructor(public payload: {blogId: string, commentId: string, repliedBy: string, content: string}) {}
}
export class AddReplySuccess implements Action {
  readonly type = ActionTypes.ADD_REPLY_SUCCESS;

  constructor(public payload: {blogId: string, comment: Comment}) {}
}
export class AddReplyFailure implements Action {
  readonly type = ActionTypes.ADD_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class UpdateComment implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT;

  constructor(public payload: {blogId: string, commentId: string, content: string}) {}
}
export class UpdateCommentSuccess implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT_SUCCESS;

  constructor(public payload: {blogId: string, comment: Comment}) {}
}
export class UpdateCommentFailure implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class UpdateReply implements Action {
  readonly type = ActionTypes.UPDATE_REPLY;

  constructor(public payload: {blogId: string, replyId: string, content: string}) {}
}
export class UpdateReplySuccess implements Action {
  readonly type = ActionTypes.UPDATE_REPLY_SUCCESS;

  constructor(public payload: {blogId: string, reply: Reply}) {}
}
export class UpdateReplyFailure implements Action {
  readonly type = ActionTypes.UPDATE_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class DeleteComment implements Action {
  readonly type = ActionTypes.DELETE_COMMENT;

  constructor(public payload: {blogId: string, commentId: string}) {}
}
export class DeleteCommentSuccess implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_SUCCESS;

  constructor(public payload: {blogId: string, commentId: string}) {}
}
export class DeleteCommentFailure implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class DeleteReply implements Action {
  readonly type = ActionTypes.DELETE_REPLY;

  constructor(public payload: {blogId: string, commentId: string, replyId: string}) {}
}
export class DeleteReplySuccess implements Action {
  readonly type = ActionTypes.DELETE_REPLY_SUCCESS;

  constructor(public payload: {blogId: string, replyId: string}) {}
}
export class DeleteReplyFailure implements Action {
  readonly type = ActionTypes.DELETE_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = LoadBlogList
  | LoadBlogListFailure
  | LoadBlogListSuccess
  | LoadBlog
  | LoadBlogFailure
  | LoadBlogSuccess
  | LoadBlogListByAuthor
  | LoadBlogListByAuthorSuccess
  | LoadBlogListByAuthorFailure
  | LoadPendingBlogList
  | LoadPendingBlogListSuccess
  | LoadPendingBlogListFailure
  | AddBlog
  | AddBlogFailure
  | AddBlogSuccess
  | ModifyBlog
  | ModifyBlogSuccess
  | ModifyBlogFailure
  | EditBlog
  | EditBlogFailure
  | EditBlogSuccess
  | RemoveBlog
  | RemoveBlogFailure
  | RemoveBlogSuccess
  | SearchBlog
  | SearchBlogSuccess
  | SearchBlogFailure
  | GetRelatedBlog
  | GetRelatedBlogSuccess
  | GetRelatedBlogFailure
  | LikeBlog
  | LikeBlogSuccess
  | LikeBlogFailure
  | LikeComment
  | LikeCommentSuccess
  | LikeCommentFailure
  | LikeReply
  | LikeReplySuccess
  | LikeReplyFailure
  | AddComment
  | AddCommentSuccess
  | AddCommentFailure
  | AddReply
  | AddReplySuccess
  | AddReplyFailure
  | UpdateComment
  | UpdateCommentSuccess
  | UpdateCommentFailure
  | UpdateReply
  | UpdateReplySuccess
  | UpdateReplyFailure
  | DeleteComment
  | DeleteCommentSuccess
  | DeleteCommentFailure
  | DeleteReply
  | DeleteReplySuccess
  | DeleteReplyFailure;
