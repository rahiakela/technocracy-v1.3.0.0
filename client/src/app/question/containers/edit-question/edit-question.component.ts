import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {QuestionActions, QuestionSelectors} from '../../../root-store/question-store';
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../../shared/models/question-model";
import {User} from "../../../shared/models/user-model";
import {Observable} from "rxjs";
import * as AuthSelectors from "../../../root-store/auth-store/auth-selectors";

@Component({
  selector: 'tech-edit-question-container',
  template: `
    <tech-edit-question
      [question]="question"
      [loading]="loading | async"
      [loaded]="loaded | async"
      [error]="error | async"
      (onBlogActionTriggered)="questionActionHandler($event)">
    </tech-edit-question>
  `,
  styles: []
})
export class EditQuestionComponent implements OnInit {

  question: Question;
  authenticatedUser: User;
  loading: Observable<boolean>;
  loaded: Observable<boolean>;
  error: Observable<any>;

  questionId: string;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get question id from route
      this.questionId = params['id'];
      // dispatch question preview action using question id
      this.store$.dispatch(new QuestionActions.PreviewQuestion({questionId: this.questionId}));
    });
  }

  ngOnInit() {
    // get blog isLoading from store
    this.loading = this.store$.pipe(select(QuestionSelectors.selectQuestionIsLoading));
    // get blog isLoaded from store
    this.loaded = this.store$.pipe(select(QuestionSelectors.selectQuestionIsLoaded));
    // get auth error from store
    this.error = this.store$.pipe(select(QuestionSelectors.selectQuestionError));
    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);

    // get selected question review using question id
    if (this.questionId) {
      this.store$.pipe(select(QuestionSelectors.selectQuestionListAskedByUser))
        .subscribe(questionList => {
          this.question = Object.values(questionList).find(question => question._id === this.questionId);
        });
    }
  }

  // handle question actions such as post, draft
  questionActionHandler(data : any) {
    const question = {
      questionId: this.questionId,
      title: data.title,
      content: data.content,
      tags: data.tags
    };
    this.store$.dispatch(new QuestionActions.EditQuestion({questionId: question.questionId , question: question}));
  }
}
