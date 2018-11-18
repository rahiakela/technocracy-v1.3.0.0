import {Injectable} from '@angular/core';
import {QuestionService} from '../../core/services/question.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {empty, Observable, of as observableOf} from 'rxjs';
import {Action} from '@ngrx/store';
import * as QuestionActions from './question-actions';
import * as QuestionSelectors from './question-selectors';
import {startWith, switchMap, map, catchError} from 'rxjs/operators';
import {Question} from '../../shared/models/question-model';

/**
 * Effects offer a way to isolate and easily test side-effects within your application.
 */
@Injectable()
export class QuestionEffects {

  constructor(private questionService: QuestionService, private actions$: Actions) {}

  @Effect()
  loadQuestionList$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LoadQuestionList>(QuestionActions.ActionTypes.LOAD_QUESTION_LIST),
    startWith(new QuestionActions.LoadQuestionList()),
    switchMap(
      action => this.questionService
        .getQuestions(0)
        .pipe(
          map(questions => new QuestionActions.LoadQuestionListSuccess({questions})),
          catchError(error => observableOf(new QuestionActions.LoadQuestionListFailure({error})))
        )
    )
  );

  @Effect()
  loadQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LoadQuestion>(QuestionActions.ActionTypes.LOAD_QUESTION),
    map(action => action.payload.questionId),
    switchMap(questionId =>{
        // initially check this question exists in store otherwise fetch from REST API
        const question = <Question>QuestionSelectors.selectQuestionById;
        if (question === null) {
          return this.questionService
            .loadQuestion(questionId)
            .pipe(
              map(question => new QuestionActions.LoadQuestionSuccess({question})),
              catchError(error => observableOf(new QuestionActions.LoadQuestionFailure({error})))
            )
        } else {
          return observableOf(new QuestionActions.LoadQuestionSuccess({question}));
        }
      }
    )
  );

  @Effect()
  loadQuestionListAskedByUser$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LoadQuestionListAskedByUser>(QuestionActions.ActionTypes.LOAD_QUESTION_LIST_ASKED_BY_USER),
    map(action => action.payload.askedBy),
    switchMap(askedBy =>
      this.questionService
        .loadQuestionListAskedByUser(askedBy)
        .pipe(
          map(questions => new QuestionActions.LoadQuestionListAskedByUserSuccess({questions})),
          catchError(error => observableOf(new QuestionActions.LoadQuestionListAskedByUserFailure({error})))
        )
    )
  );

  @Effect()
  loadPendingQuestionList$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LoadPendingQuestionList>(QuestionActions.ActionTypes.LOAD_PENDING_QUESTION_LIST),
    switchMap(() =>
      this.questionService
        .loadPendingQuestionList()
        .pipe(
          map(questions => new QuestionActions.LoadPendingQuestionListSuccess({questions})),
          catchError(error => observableOf(new QuestionActions.LoadPendingQuestionListFailure({error})))
        )
    )
  );

  @Effect()
  addQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.AddQuestion>(QuestionActions.ActionTypes.ADD_QUESTION),
    switchMap(action =>
      this.questionService
        .addQuestion(action.payload.question)
        .pipe(
          map(question => new QuestionActions.AddQuestionSuccess({question: question})),
          catchError(error => observableOf(new QuestionActions.AddQuestionFailure({error})))
        )
    )
  );

  @Effect()
  modifyQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.ModifyQuestion>(QuestionActions.ActionTypes.MODIFY_QUESTION),
    switchMap(action =>
      this.questionService
        .modifyQuestion(action.payload.data.questionId, action.payload.data.action)
        .pipe(
          map(question => new QuestionActions.ModifyQuestionSuccess({question: question})),
          catchError(error => observableOf(new QuestionActions.ModifyQuestionFailure({error})))
        )
    )
  );

  @Effect()
  editQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.EditQuestion>(QuestionActions.ActionTypes.EDIT_QUESTION),
    switchMap(action =>
      this.questionService
        .editQuestion(action.payload.question, action.payload.questionId)
        .pipe(
          map(question => new QuestionActions.EditQuestionSuccess({question: question})),
          catchError(error => observableOf(new QuestionActions.EditQuestionFailure({error})))
        )
    )
  );

  @Effect()
  removeQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.RemoveQuestion>(QuestionActions.ActionTypes.REMOVE_QUESTION),
    switchMap(action =>
      this.questionService
        .deleteQuestion(action.payload.questionId)
        .pipe(
          map(question => new QuestionActions.RemoveQuestionSuccess({question: question})),
          catchError(error => observableOf(new QuestionActions.RemoveQuestionFailure({error})))
        )
    )
  );

  @Effect()
  likeQuestion$: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LikeQuestion>(QuestionActions.ActionTypes.LIKE_QUESTION),
    switchMap(action =>
      this.questionService.like(action.payload.questionId, action.payload.likedBy)
        .pipe(
          map(question => new QuestionActions.LikeQuestionSuccess({question: question})),
          catchError(error => observableOf(new QuestionActions.LikeQuestionFailure({error})))
        )
    )
  );

  @Effect()
  likeComment: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LikeComment>(QuestionActions.ActionTypes.LIKE_COMMENT),
    switchMap(action =>
      this.questionService.likeComment(action.payload.commentId, action.payload.likedBy)
        .pipe(
          map(comment => new QuestionActions.LikeCommentSuccess({questionId: action.payload.questionId, comment: comment})),
          catchError(error => observableOf(new QuestionActions.LikeCommentFailure({error})))
        )
    )
  );

  @Effect()
  addComment: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.AddComment>(QuestionActions.ActionTypes.ADD_COMMENT),
    switchMap(action =>
      this.questionService.addComment(action.payload.questionId, action.payload.commentedBy, action.payload.content, action.payload.notification)
        .pipe(
          map(question => new QuestionActions.AddCommentSuccess({question: question})),
          catchError(error => observableOf(new QuestionActions.AddCommentFailure({error})))
        )
    )
  );

  @Effect()
  editComment: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.UpdateComment>(QuestionActions.ActionTypes.UPDATE_COMMENT),
    switchMap(action =>
      this.questionService.editCommentReply(action.payload.commentId, 'comment' ,action.payload.content)
        .pipe(
          map(comment => new QuestionActions.UpdateCommentSuccess({questionId: action.payload.questionId ,comment: comment})),
          catchError(error => observableOf(new QuestionActions.UpdateCommentFailure({error})))
        )
    )
  );

  @Effect()
  deleteComment: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.DeleteComment>(QuestionActions.ActionTypes.DELETE_COMMENT),
    switchMap(action =>
      this.questionService.deleteComment(action.payload.commentId)
        .pipe(
          map(isDeleted => new QuestionActions.DeleteCommentSuccess({questionId: action.payload.questionId ,commentId: action.payload.commentId})),
          catchError(error => observableOf(new QuestionActions.DeleteCommentFailure({error})))
        )
    )
  );

  @Effect()
  likeReply: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.LikeReply>(QuestionActions.ActionTypes.LIKE_REPLY),
    switchMap(action =>
      this.questionService.likeReply(action.payload.replyId, action.payload.likedBy)
        .pipe(
          map(reply => new QuestionActions.LikeReplySuccess({questionId: action.payload.questionId, reply: reply})),
          catchError(error => observableOf(new QuestionActions.LikeReplyFailure({error})))
        )
    )
  );

  @Effect()
  addReply: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.AddReply>(QuestionActions.ActionTypes.ADD_REPLY),
    switchMap(action => {
      if (action.payload.content === '') {
        return empty();
      }

      return this.questionService.addReply(action.payload.questionId, action.payload.commentId, action.payload.repliedBy, action.payload.content)
        .pipe(
          map(comment => new QuestionActions.AddReplySuccess({questionId: action.payload.questionId, comment: comment})),
          catchError(error => observableOf(new QuestionActions.AddReplyFailure({error})))
        )
    })
  );

  @Effect()
  editReply: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.UpdateReply>(QuestionActions.ActionTypes.UPDATE_REPLY),
    switchMap(action =>
      this.questionService.editCommentReply(action.payload.replyId , 'reply', action.payload.content)
        .pipe(
          map(reply => new QuestionActions.UpdateReplySuccess({questionId: action.payload.questionId ,reply: reply})),
          catchError(error => observableOf(new QuestionActions.UpdateReplyFailure({error})))
        )
    )
  );

  @Effect()
  deleteReply: Observable<Action> = this.actions$.pipe(
    ofType<QuestionActions.DeleteReply>(QuestionActions.ActionTypes.DELETE_REPLY),
    switchMap(action =>
      this.questionService.deleteReply(action.payload.replyId)
        .pipe(
          map(isDeleted => new QuestionActions.DeleteReplySuccess({
            questionId: action.payload.questionId,
            replyId: action.payload.replyId
          })),
          catchError(error => observableOf(new QuestionActions.DeleteReplyFailure({error})))
        )
    )
  );
}
