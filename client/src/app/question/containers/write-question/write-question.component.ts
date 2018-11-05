import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {QuestionActions, QuestionSelectors} from '../../../root-store/question-store';
import {AuthSelectors} from '../../../root-store/auth-store';
import {Router} from "@angular/router";
import {User} from "../../../shared/models/user-model";
import {Observable} from "rxjs";

@Component({
  selector: 'tech-write-question-container',
  template: `
    <tech-write-question
      [loading]="loading | async"
      [loaded]="loaded | async"
      [error]="error | async"
      (onQuestionActionTriggered)="questionActionHandler($event)"
    >
    </tech-write-question>
  `,
  styles: []
})
export class WriteQuestionComponent implements OnInit {

  authenticatedUser: User;

  public loading: Observable<boolean>;
  public loaded: Observable<boolean>;
  public error: Observable<any>;

  constructor(private store$: Store<RootStoreState.State>, private router: Router) { }

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
  }

  // handle question actions such as post, draft
  questionActionHandler(data : any) {
    const question = {
      action : data.action,
      askedBy: this.authenticatedUser._id,
      title: data.title,
      content: data.content,
      tags: data.tags
    };
    this.store$.dispatch(new QuestionActions.AddQuestion({question: question}));
  }

}
