import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Question} from "../../../shared/models/question-model";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'tech-my-question',
  templateUrl: './my-question.component.html',
  styleUrls: ['./my-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyQuestionComponent implements OnInit, OnChanges {

  @Input()
  questionList: Question[] = [];
  @Input()
  loading: boolean;
  @Output()
  onQuestionActionTriggered = new EventEmitter<any>();

  dataSource: MatTableDataSource<QuestionElement>;
  displayedColumns: string[] = ['position', 'title', 'status', 'createdOn', 'star'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  status: string;
  title: string;

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    let i = 0;
    const ELEMENT_DATA: QuestionElement[] = Object.values(this.questionList).map((question: any) => {
      return {position: ++i, title: question.title, status: question.status, createdOn: question.createdOn}
    });

    this.dataSource = new MatTableDataSource<QuestionElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  preview() {
    const question = this.getSelectedQuestion(this.title);
    this.router.navigate(['question/preview', question._id, 'my-question']);
  }

  edit() {
    const question = this.getSelectedQuestion(this.title);
    this.router.navigate(['question/edit', question._id]);
  }

  post() {
    this.onQuestionActionTriggered.emit({
      action: 'post',
      questionId: this.getSelectedQuestion(this.title)._id
    });
  }

  delete() {
    this.onQuestionActionTriggered.emit({
      action: 'delete',
      questionId: this.getSelectedQuestion(this.title)._id
    });
  }

  onRowClicked(row) {
    // console.log('Row clicked: ', row);
    this.status = row.status;
    this.title = row.title;
  }

  getSelectedQuestion(title: string): Question {
    return Object.values(this.questionList).find(question => question.title === this.title);
  }

  formatDate(submitDate: Date) {
    return moment(submitDate).format('MM/DD/YYYY');
  }
}

export interface QuestionElement {
  title: string;
  position: number;
  createdOn: Date;
  status: string;
}
