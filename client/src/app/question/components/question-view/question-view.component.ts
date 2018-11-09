import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, SimpleChange, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Question} from '../../../shared/models/question-model';
import {UtilService} from '../../../core/services/util.service';
import {User} from '../../../shared/models/user-model';
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import * as moment from "moment";
import {Skill} from "../../../shared/models/profile-model";

@Component({
  selector: 'tech-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionViewComponent implements OnInit {

  @ViewChild('richTextEditor')
  richTextEditor: ElementRef;

  @Input()
  question: Question;

  @Output()
  onQuestionActionTriggered = new EventEmitter<any>();

  questionContent = {
    action: '',
    questionId: '',
    commentId: '',
    replyId: '',
    content: '',
    notification: false
  };

  editorContent: string;

  contentToUpdate: string;
  notification: boolean;

  constructor(public utilService: UtilService,
              public router: Router,
              private titleService: Title,
              private meta: Meta) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // select question using question id
    const question: SimpleChange = changes.question;
    // console.log('prev value: ', question.previousValue);
    // console.log('got name: ', question.currentValue);
    this.question = question.currentValue;
  }

  questionSoloView() {
    if (this.question !== undefined) {
      // this.comments = this.question.comments;
      // this.totalLikes = this.question.likes !== undefined ? this.question.likes.length : 0;
      // this.totalComments = this.question.comments !== undefined ? this.question.comments.length : 0;
      // this.totalVoteUp = this.question.voteUp !== undefined ? this.question.voteUp.length : 0;
      // this.totalVoteDown = this.question.voteDown !== undefined ? this.question.voteDown.length : 0;
      // this.currentUserId = this.question.askedBy !== undefined ? this.question.askedBy._id : '';

      // setting page title
      this.setTitle(this.question.title);
      // setting meta tags
      this.addMetaTag(this.question);
    }
  }

  like() {
    // redirect to login page if the user is not logged in
    if (!this.utilService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }

    this.onQuestionActionTriggered.emit({
      action: 'like',
      content: '',
      notification: this.notification
    });

    // reset question content to default state
    this.resetQuestionContent();
  }

  addComment() {

    // redirect to login page if the user is not logged in
    if (!this.utilService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }

    // comment content to question content object
    Object.assign(this.questionContent, {
      content: this.editorContent,
      notification: this.notification
    });

    // if the action type is empty then it is for comment
    if (this.questionContent.action === '') {
      Object.assign(this.questionContent, {action: 'comment'});
    }

    this.onQuestionActionTriggered.emit(this.questionContent);
    // reset question content to default state
    this.resetQuestionContent();
  }

  editorContentHandler(value: any) {
    this.editorContent = this.utilService.encodeHtml(value);
  }

  commentActionHandler(value: any) {
    // redirect to login page if the user is not logged in
    if (!this.utilService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }

    // scroll to comment editor and set focus on if triggered action is reply
    if (value !== undefined && value.action === 'reply') {
      this.richTextEditor.nativeElement.scrollIntoView();
    }

    // check comment or reply edit action and pass content to editor
    if (value.action === 'comment-edit' || value.action === 'reply-edit'){
      this.richTextEditor.nativeElement.scrollIntoView();
      this.contentToUpdate = value.content;
    }

    // assign comment output to question content object and emit the event if the action is not for comment's reply
    Object.assign(this.questionContent, value);
    this.onQuestionActionTriggered.emit(this.questionContent);
  }

  showSkillsWithHashTag(tags: Skill[]) {
    return tags !== null ? this.utilService.getSkillWithHashTag(tags) : '';
  }

  getUserName(user: User): string {
    return user != null? this.utilService.getUserName(user): '';
  }

  resetQuestionContent() {
    this.questionContent = {
      action: '',
      questionId: '',
      commentId: '',
      replyId: '',
      content: '',
      notification: false
    };
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  addMetaTag(question: Question) {
    // setting page's meta tag
    this.meta.updateTag({property: 'og:title', content: question.title});
    this.meta.updateTag({property: 'og:url', content: `https://www.tecknocracy.com/question/${question._id}`});
    this.meta.updateTag({property: 'article:published_time', content: this.question.publishedOn === null ? '' : moment(question.publishedOn, 'YYYYMMDDHHmmss').toString()});
    this.meta.updateTag({property: 'article:modified_time', content: this.question.updatedOn === null ? '' : moment(question.updatedOn, 'YYYYMMDDHHmmss').toString()});

    // adding all blog keywords into  article tag
    question.tags.forEach(tag => {
      this.meta.addTag({property: 'article:tag', content: tag});
    });
  }
}
