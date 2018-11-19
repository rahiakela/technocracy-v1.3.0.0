import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user-model";
import {Observable} from "rxjs";
import {Question} from "../../../shared/models/question-model";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {QuestionActions, QuestionSelectors} from '../../../root-store/question-store';
import {AuthSelectors} from '../../../root-store/auth-store';

@Component({
  selector: 'tech-my-question-container',
  template: `
    <tech-my-question
      [questionList]="questionList$ | async"
      [loading]="loading$ | async"
      (onQuestionActionTriggered)="questionActionHandler($event)"
    >
    </tech-my-question>
  `,
  styles: []
})
export class MyQuestionComponent implements OnInit {

  authenticatedUser: User;
  questionList$: Observable<Question[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    // get question isLoading from store
    this.loading$ = this.store$.pipe(select(QuestionSelectors.selectQuestionIsLoading));
    // get question isLoaded from store
    this.loaded$ = this.store$.pipe(select(QuestionSelectors.selectQuestionIsLoaded));
    // get auth error from store
    this.error$ = this.store$.pipe(select(QuestionSelectors.selectQuestionError));
    // select authenticated user
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => this.authenticatedUser = user);
    // select question list that are written by authenticated user
    this.questionList$ = this.store$.pipe(select(QuestionSelectors.selectQuestionListAskedByUser));

    // load question list written by author
    this.store$.dispatch(new QuestionActions.LoadQuestionListAskedByUser({askedBy: this.authenticatedUser._id}));
  }

  // handle question actions such as post and delete
  questionActionHandler(data : any) {
    switch (data.action) {
      case 'post':
        this.store$.dispatch(new QuestionActions.ModifyQuestion({data}));
        break;
      case 'delete':
        this.store$.dispatch(new QuestionActions.RemoveQuestion({questionId: data.questionId}));
        break;
    }
  }

}
