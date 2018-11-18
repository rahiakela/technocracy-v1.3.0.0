import {Action} from "@ngrx/store";
import {Question} from "../../shared/models/question-model";
import {Comment, Reply} from "../../shared/models/comment-model";

export enum ActionTypes {
  LOAD_QUESTION_LIST          = '[Question] Load Question List',
  LOAD_QUESTION_LIST_FAILURE  = '[Question] Load Question List Failure',
  LOAD_QUESTION_LIST_SUCCESS  = '[Question] Load Question List Success',

  LOAD_QUESTION               = '[Question] Load Question',
  LOAD_QUESTION_FAILURE       = '[Question] Load Question Failure',
  LOAD_QUESTION_SUCCESS       = '[Question] Load Question Success',

  ADD_QUESTION                = '[Question] Add Question',
  ADD_QUESTION_FAILURE        = '[Question] Add Question Failure',
  ADD_QUESTION_SUCCESS        = '[Question] Add Question Success',

  LOAD_QUESTION_LIST_ASKED_BY_USER          = '[Question] Load Question List asked by User',
  LOAD_QUESTION_LIST_ASKED_BY_USER_FAILURE  = '[Question] Load Question List asked by User Failure',
  LOAD_QUESTION_LIST_ASKED_BY_USER_SUCCESS  = '[Question] Load Question List asked by User Success',

  LOAD_PENDING_QUESTION_LIST          = '[Question] Load Pending Question List',
  LOAD_PENDING_QUESTION_LIST_FAILURE  = '[Question] Load Pending Question List Failure',
  LOAD_PENDING_QUESTION_LIST_SUCCESS  = '[Question] Load Pending Question List Success',

  MODIFY_QUESTION             = '[Question] Modify Question',
  MODIFY_QUESTION_FAILURE     = '[Question] Modify Question Failure',
  MODIFY_QUESTION_SUCCESS     = '[Question] Modify Question Success',

  PREVIEW_QUESTION            = '[Question] Preview Question',
  PREVIEW_QUESTION_FAILURE    = '[Question] Preview Question Failure',
  PREVIEW_QUESTION_SUCCESS    = '[Question] Preview Question Success',

  EDIT_QUESTION               = '[Question] Edit Question',
  EDIT_QUESTION_FAILURE       = '[Question] Edit Question Failure',
  EDIT_QUESTION_SUCCESS       = '[Question] Edit Question Success',

  REMOVE_QUESTION             = '[Question] Remove Question',
  REMOVE_QUESTION_FAILURE     = '[Question] Remove Question Failure',
  REMOVE_QUESTION_SUCCESS     = '[Question] Remove Question Success',

  LIKE_QUESTION               = '[Question] Like Question',
  LIKE_QUESTION_FAILURE       = '[Question] Like Question Failure',
  LIKE_QUESTION_SUCCESS       = '[Question] Like Question Success',

  LIKE_COMMENT                = '[Question] Like Comment',
  LIKE_COMMENT_FAILURE        = '[Question] Like Comment Failure',
  LIKE_COMMENT_SUCCESS        = '[Question] Like Comment Success',

  LIKE_REPLY                  = '[Question] Like Reply',
  LIKE_REPLY_FAILURE          = '[Question] Like Reply Failure',
  LIKE_REPLY_SUCCESS          = '[Question] Like Reply Success',

  ADD_COMMENT                 = '[Question] Add Comment',
  ADD_COMMENT_FAILURE         = '[Question] Add Comment Failure',
  ADD_COMMENT_SUCCESS         = '[Question] Add Comment Success',

  ADD_REPLY                   = '[Question] Add Reply',
  ADD_REPLY_FAILURE           = '[Question] Add Reply Failure',
  ADD_REPLY_SUCCESS           = '[Question] Add Reply Success',

  UPDATE_COMMENT              = '[Question] Update Comment',
  UPDATE_COMMENT_FAILURE      = '[Question] Update Comment Failure',
  UPDATE_COMMENT_SUCCESS      = '[Question] Update Comment Success',

  UPDATE_REPLY                = '[Question] Update Reply',
  UPDATE_REPLY_FAILURE        = '[Question] Update Reply Failure',
  UPDATE_REPLY_SUCCESS        = '[Question] Update Reply Success',

  DELETE_COMMENT              = '[Question] Delete Comment',
  DELETE_COMMENT_FAILURE      = '[Question] Delete Comment Failure',
  DELETE_COMMENT_SUCCESS      = '[Question] Delete Comment Success',

  DELETE_REPLY                = '[Question] Delete Reply',
  DELETE_REPLY_FAILURE        = '[Question] Delete Reply Failure',
  DELETE_REPLY_SUCCESS        = '[Question] Delete Reply Success',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadQuestionList  implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_LIST;
}
export class LoadQuestionListFailure implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_LIST_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class LoadQuestionListSuccess implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_LIST_SUCCESS;

  constructor(public payload: {questions: Question[]}) {}
}

export class LoadQuestion  implements Action{
  readonly type = ActionTypes.LOAD_QUESTION;

  constructor(public payload: {questionId: string}) {}
}
export class LoadQuestionFailure implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class LoadQuestionSuccess implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_SUCCESS;

  constructor(public payload: {question: Question}) {}
}

export class LoadQuestionListAskedByUser  implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER;
  constructor(public payload: {askedBy: string}) {}
}
export class LoadQuestionListAskedByUserFailure implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class LoadQuestionListAskedByUserSuccess implements Action{
  readonly type = ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER_SUCCESS;

  constructor(public payload: {questions: Question[]}) {}
}

export class LoadPendingQuestionList  implements Action{
  readonly type = ActionTypes.LOAD_PENDING_QUESTION_LIST;
}
export class LoadPendingQuestionListFailure implements Action{
  readonly type = ActionTypes.LOAD_PENDING_QUESTION_LIST_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class LoadPendingQuestionListSuccess implements Action{
  readonly type = ActionTypes.LOAD_PENDING_QUESTION_LIST_SUCCESS;

  constructor(public payload: {questions: Question[]}) {}
}

export class AddQuestion  implements Action{
  readonly type = ActionTypes.ADD_QUESTION;

  constructor(public payload: {question: any}) {}
}
export class AddQuestionFailure implements Action{
  readonly type = ActionTypes.ADD_QUESTION_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class AddQuestionSuccess implements Action{
  readonly type = ActionTypes.ADD_QUESTION_SUCCESS;

  constructor(public payload: {question: Question}) {}
}

export class ModifyQuestion  implements Action{
  readonly type = ActionTypes.MODIFY_QUESTION;

  constructor(public payload: {data: any}) {}
}
export class ModifyQuestionFailure implements Action{
  readonly type = ActionTypes.MODIFY_QUESTION_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class ModifyQuestionSuccess implements Action{
  readonly type = ActionTypes.MODIFY_QUESTION_SUCCESS;

  constructor(public payload: { question: Question}) {}
}

export class PreviewQuestion  implements Action{
  readonly type = ActionTypes.PREVIEW_QUESTION;

  constructor(public payload: {questionId: string}) {}
}
export class PreviewQuestionFailure implements Action{
  readonly type = ActionTypes.PREVIEW_QUESTION_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class PreviewQuestionSuccess implements Action{
  readonly type = ActionTypes.PREVIEW_QUESTION_SUCCESS;

  constructor(public payload: { question: Question}) {}
}

export class EditQuestion  implements Action{
  readonly type = ActionTypes.EDIT_QUESTION;

  constructor(public payload: {questionId: string, question: Question}) {}
}
export class EditQuestionFailure implements Action{
  readonly type = ActionTypes.EDIT_QUESTION_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class EditQuestionSuccess implements Action{
  readonly type = ActionTypes.EDIT_QUESTION_SUCCESS;

  constructor(public payload: {question: Question}) {}
}

export class RemoveQuestion  implements Action{
  readonly type = ActionTypes.REMOVE_QUESTION;

  constructor(public payload: {questionId: string}) {}
}
export class RemoveQuestionFailure implements Action{
  readonly type = ActionTypes.REMOVE_QUESTION_FAILURE;

  constructor(public payload:{ error: string}) {}
}
export class RemoveQuestionSuccess implements Action{
  readonly type = ActionTypes.REMOVE_QUESTION_SUCCESS;

  constructor(public payload: {question: Question}) {}
}

export class LikeQuestion implements Action {
  readonly type = ActionTypes.LIKE_QUESTION;

  constructor(public payload: {questionId: string, likedBy: string}) {}
}
export class LikeQuestionSuccess implements Action {
  readonly type = ActionTypes.LIKE_QUESTION_SUCCESS;

  constructor(public payload: { question: Question}) {}
}
export class LikeQuestionFailure implements Action {
  readonly type = ActionTypes.LIKE_QUESTION_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class LikeComment implements Action {
  readonly type = ActionTypes.LIKE_COMMENT;

  constructor(public payload: {questionId: string, commentId: string, likedBy: string}) {}
}
export class LikeCommentSuccess implements Action {
  readonly type = ActionTypes.LIKE_COMMENT_SUCCESS;

  constructor(public payload: {questionId: string, comment: Comment}) {}
}
export class LikeCommentFailure implements Action {
  readonly type = ActionTypes.LIKE_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class LikeReply implements Action {
  readonly type = ActionTypes.LIKE_REPLY;

  constructor(public payload: {questionId: string, commentId: string, replyId: string, likedBy: string}) {}
}
export class LikeReplySuccess implements Action {
  readonly type = ActionTypes.LIKE_REPLY_SUCCESS;

  constructor(public payload: {questionId: string, reply: Reply}) {}
}
export class LikeReplyFailure implements Action {
  readonly type = ActionTypes.LIKE_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class AddComment implements Action {
  readonly type = ActionTypes.ADD_COMMENT;

  constructor(public payload: {questionId: string, commentedBy: string, content: string, notification: boolean}) {}
}
export class AddCommentSuccess implements Action {
  readonly type = ActionTypes.ADD_COMMENT_SUCCESS;

  constructor(public payload: {question: Question}) {}
}
export class AddCommentFailure implements Action {
  readonly type = ActionTypes.ADD_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class AddReply implements Action {
  readonly type = ActionTypes.ADD_REPLY;

  constructor(public payload: {questionId: string, commentId: string, repliedBy: string, content: string}) {}
}
export class AddReplySuccess implements Action {
  readonly type = ActionTypes.ADD_REPLY_SUCCESS;

  constructor(public payload: {questionId: string, comment: Comment}) {}
}
export class AddReplyFailure implements Action {
  readonly type = ActionTypes.ADD_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class UpdateComment implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT;

  constructor(public payload: {questionId: string, commentId: string, content: string}) {}
}
export class UpdateCommentSuccess implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT_SUCCESS;

  constructor(public payload: {questionId: string, comment: Comment}) {}
}
export class UpdateCommentFailure implements Action {
  readonly type = ActionTypes.UPDATE_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class UpdateReply implements Action {
  readonly type = ActionTypes.UPDATE_REPLY;

  constructor(public payload: {questionId: string, replyId: string, content: string}) {}
}
export class UpdateReplySuccess implements Action {
  readonly type = ActionTypes.UPDATE_REPLY_SUCCESS;

  constructor(public payload: {questionId: string, reply: Reply}) {}
}
export class UpdateReplyFailure implements Action {
  readonly type = ActionTypes.UPDATE_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class DeleteComment implements Action {
  readonly type = ActionTypes.DELETE_COMMENT;

  constructor(public payload: {questionId: string, commentId: string}) {}
}
export class DeleteCommentSuccess implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_SUCCESS;

  constructor(public payload: {questionId: string, commentId: string}) {}
}
export class DeleteCommentFailure implements Action {
  readonly type = ActionTypes.DELETE_COMMENT_FAILURE;

  constructor(public payload: { error: string}) {}
}

export class DeleteReply implements Action {
  readonly type = ActionTypes.DELETE_REPLY;

  constructor(public payload: {questionId: string, commentId: string, replyId: string}) {}
}
export class DeleteReplySuccess implements Action {
  readonly type = ActionTypes.DELETE_REPLY_SUCCESS;

  constructor(public payload: {questionId: string, replyId: string}) {}
}
export class DeleteReplyFailure implements Action {
  readonly type = ActionTypes.DELETE_REPLY_FAILURE;

  constructor(public payload: { error: string}) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = LoadQuestionList
  | LoadQuestionListFailure
  | LoadQuestionListSuccess
  | LoadQuestion
  | LoadQuestionFailure
  | LoadQuestionSuccess
  | LoadQuestionListAskedByUser
  | LoadQuestionListAskedByUserSuccess
  | LoadQuestionListAskedByUserFailure
  | LoadPendingQuestionList
  | LoadPendingQuestionListSuccess
  | LoadPendingQuestionListFailure
  | AddQuestion
  | AddQuestionFailure
  | AddQuestionSuccess
  | PreviewQuestion
  | PreviewQuestionSuccess
  | PreviewQuestionFailure
  | ModifyQuestion
  | ModifyQuestionSuccess
  | ModifyQuestionFailure
  | EditQuestion
  | EditQuestionFailure
  | EditQuestionSuccess
  | RemoveQuestion
  | RemoveQuestionFailure
  | RemoveQuestionSuccess
  | LikeQuestion
  | LikeQuestionSuccess
  | LikeQuestionFailure
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
