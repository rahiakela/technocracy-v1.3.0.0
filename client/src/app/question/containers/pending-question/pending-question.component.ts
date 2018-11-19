import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Question} from "../../../shared/models/question-model";
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {QuestionActions, QuestionSelectors} from '../../../root-store/question-store';

@Component({
  selector: 'tech-pending-question-container',
  template: `
    <tech-pending-question
      [questionList]="questionList$ | async"
      [loading]="loading$ | async"
      (onQuestionActionTriggered)="questionActionHandler($event)"
    >
    </tech-pending-question>
  `,
  styles: []
})
export class PendingQuestionComponent implements OnInit {

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
    // select question list that are written by authenticated user
    this.questionList$ = this.store$.pipe(select(QuestionSelectors.selectPendingQuestionList));

    // load question list list for approval
    this.store$.dispatch(new QuestionActions.LoadPendingQuestionList());
  }

  // handle question actions such as post and delete
  questionActionHandler(data : any) {
    this.store$.dispatch(new QuestionActions.ModifyQuestion({data}));
  }
}
