import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {RootStoreState} from '../../../root-store';
import {QuestionActions, QuestionSelectors} from '../../../root-store/question-store';
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../../shared/models/question-model";

@Component({
  selector: 'tech-question-preview-container',
  template: `
    <tech-question-preview [question]="question" (onQuestionActionTriggered)="questionActionHandler($event)"></tech-question-preview>
  `,
  styles: []
})
export class QuestionPreviewComponent implements OnInit {

  public question: Question;

  questionId: string;
  previewType: string;

  constructor(private store$: Store<RootStoreState.State>, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      // get question id from route
      this.questionId = params['id'];
      this.previewType = params['type'];
      // dispatch question preview action using question id
      this.store$.dispatch(new QuestionActions.PreviewQuestion({questionId: this.questionId}));
    });
  }

  ngOnInit() {
    // get selected question review using question id and based on preview type
    switch (this.previewType) {
      case 'my-question':
        this.store$.pipe(select(QuestionSelectors.selectQuestionListAskedByUser))
          .subscribe(questionList => {
            this.question = Object.values(questionList).find(question => question._id === this.questionId);
          });
        break;
      case 'pending':
        this.store$.pipe(select(QuestionSelectors.selectPendingQuestionList))
          .subscribe(questionList => {
            this.question = Object.values(questionList).find(question => question._id === this.questionId);
          });
    }
  }

  // handle question actions such as post and delete
  questionActionHandler(data : any) {
    this.store$.dispatch(new QuestionActions.ModifyQuestion({data: {questionId: data.questionId, action: 'pending'}}));
  }

}
