import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../shared/models/question-model";
import {UtilService} from "../../../core/services/util.service";
import {User} from "../../../shared/models/user-model";
import {Skill} from "../../../shared/models/profile-model";
import * as moment from "moment";

@Component({
  selector: 'tech-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionPreviewComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  onQuestionActionTriggered = new EventEmitter<any>();

  constructor(public utilService: UtilService) { }

  ngOnInit() {
  }

  post(questionId: string) {
    this.onQuestionActionTriggered.emit({
      action: 'post',
      questionId: questionId
    });
  }

  formatDate(submitDate: Date) {
    return moment(submitDate).format('LLL');
  }

  getUserName(user: User): string {
    return user != null? this.utilService.getUserName(user): '';
  }
}
