import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../shared/models/question-model';
import {Blog} from '../../../shared/models/blog-model';
import {select, Store} from '@ngrx/store';
import * as RootStoreState from '../../../root-store/root-state';
import { QuestionSelectors, QuestionActions } from '../../../root-store/question-store';
import {BlogSelectors} from '../../../root-store/blog-store';
import {Observable} from 'rxjs';

@Component({
  selector: 'tech-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {

  questions$: Observable<Question[]>;
  relatedBlogs: Blog[];

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.store$.dispatch(new QuestionActions.LoadQuestionList());
    // fetch question list
    this.questions$ = this.store$.pipe(select(QuestionSelectors.selectQuestionList));
    // get related blog list
    this.store$.pipe(select(BlogSelectors.selectRelatedBlogList))
      .subscribe(blogs => this.relatedBlogs = blogs);
  }

}
