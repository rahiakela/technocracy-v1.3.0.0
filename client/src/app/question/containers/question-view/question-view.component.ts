import {Component, OnChanges, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../../root-store';
import {Question} from '../../../shared/models/question-model';
import {ActivatedRoute} from "@angular/router";
import {QuestionActions, QuestionSelectors} from "../../../root-store/question-store";
import {User} from "../../../shared/models/user-model";
import {AuthSelectors} from '../../../root-store/auth-store';

@Component({
  selector: 'tech-question-view-container',
  template: `
    <tech-question-view 
      [question]="question"
      (onQuestionActionTriggered)="questionActionHandler($event)"
    ></tech-question-view>
  `
})
export class QuestionViewContainerComponent implements OnInit, OnChanges {

  question: Question;

  questionId: string;
  authenticatedUser: User;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get question id from route
      this.questionId = params['id'];

      // dispatch load question action using question id
      this.store$.dispatch(new QuestionActions.LoadQuestion({questionId: this.questionId}));
    });
  }

  ngOnInit() {
    // select question using question id
    this.store$.pipe(select(QuestionSelectors.selectQuestionById))
      .subscribe(question => {
        // if the question is not already loaded then loading question data from route resolver
        if (question) {
          this.question = question;
        } else {
          this.activeRoute.params.subscribe(params => {
            // loading question data from route resolver
            this.question = this.activeRoute.snapshot.data['question'];
            // console.log('Question:', this.question);
          });
        }
      });

    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);
  }

  ngOnChanges() {
    // select question using question id
    this.store$.pipe(select(QuestionSelectors.selectQuestionById))
      .subscribe(question => {
        // if the question is not already loaded then loading question data from route resolver
        if (question) {
          this.question = question;
        } else {
          this.activeRoute.params.subscribe(params => {
            // loading question data from route resolver
            this.question = this.activeRoute.snapshot.data['question'];
            // console.log('Question:', this.question);
          });
        }
      });
  }

  // handle question actions such as like, comment and reply and dispatch action to store
  questionActionHandler(data : any) {
    switch (data.action) {

      case 'like' :
        this.store$.dispatch(new QuestionActions.LikeQuestion({
          questionId: this.questionId,
          likedBy: this.authenticatedUser._id
        }));
        break;

      case 'comment' :
        this.store$.dispatch(new QuestionActions.AddComment({
          questionId: this.questionId,
          commentedBy: this.authenticatedUser._id,
          content: data.content,
          notification: data.notification
        }));
        break;

      case 'comment-edit' :
        this.store$.dispatch(new QuestionActions.UpdateComment({
          questionId: this.questionId,
          commentId: data.commentId,
          content: data.content
        }));
        break;

      case 'comment-delete' :
        this.store$.dispatch(new QuestionActions.DeleteComment({
          questionId: this.questionId,
          commentId: data.commentId
        }));
        break;

      case 'reply':
        this.store$.dispatch(new QuestionActions.AddReply({
          questionId: this.questionId,
          commentId: data.commentId,
          repliedBy: this.authenticatedUser._id,
          content: data.content
        }));
        break;

      case 'reply-edit':
        this.store$.dispatch(new QuestionActions.UpdateReply({
          questionId: this.questionId,
          replyId: data.replyId,
          content: data.content
        }));
        break;

      case 'reply-delete':
        this.store$.dispatch(new QuestionActions.DeleteReply({
          questionId: this.questionId,
          commentId: data.commentId,
          replyId: data.replyId
        }));
        break;

      case 'comment-like':
        this.store$.dispatch(new QuestionActions.LikeComment({
          questionId: this.questionId,
          commentId: data.commentId,
          likedBy: this.authenticatedUser._id
        }));
        break;

      case 'reply-like':
        this.store$.dispatch(new QuestionActions.LikeReply({
          questionId: this.questionId,
          commentId: data.commentId,
          replyId: data.replyId,
          likedBy: this.authenticatedUser._id
        }));
        break;
    }
  }
}
