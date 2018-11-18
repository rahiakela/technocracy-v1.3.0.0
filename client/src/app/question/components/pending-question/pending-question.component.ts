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
  selector: 'tech-pending-question',
  templateUrl: './pending-question.component.html',
  styleUrls: ['./pending-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingQuestionComponent implements OnInit, OnChanges {

  @Input()
  questionList: Question[] = [];
  @Input()
  loading: boolean;
  @Output()
  onQuestionActionTriggered = new EventEmitter<any>();

  dataSource: MatTableDataSource<QuestionColumn>;
  displayedColumns: string[] = ['position', 'title', 'createdOn', 'star'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  status: string;
  title: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    let i = 0;
    const ELEMENT_DATA: QuestionColumn[] = Object.values(this.questionList)
      .map((question: any) => {
        return {position: ++i, title: question.title, createdOn: question.createdOn}
      });

    this.dataSource = new MatTableDataSource<QuestionColumn>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  preview() {
    const question = this.getSelectedQuestion(this.title);
    this.router.navigate(['question/preview', question._id, 'pending']);
  }


  publish() {
    this.onQuestionActionTriggered.emit({
      action: 'published',
      questionId: this.getSelectedQuestion(this.title)._id
    });
  }

  holdOn() {
    this.onQuestionActionTriggered.emit({
      action: 'on_hold',
      questionId: this.getSelectedQuestion(this.title)._id
    });
  }

  reject() {
    this.onQuestionActionTriggered.emit({
      action: 'rejected',
      questionId: this.getSelectedQuestion(this.title)._id
    });
  }

  onRowClicked(row) {
    // console.log('Row clicked: ', row);
    /*this.status = row.status;*/
    this.title = row.title;
  }

  getSelectedQuestion(title: string): Question {
    return Object.values(this.questionList).find(question => question.title === this.title);
  }

  formatDate(submitDate: Date) {
    return moment(submitDate).format('MM/DD/YYYY');
  }
}

export interface QuestionColumn {
  position: number;
  title: string;
  createdOn: Date;
}
