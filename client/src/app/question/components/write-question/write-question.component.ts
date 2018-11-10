import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../core/services/util.service";
import {User} from "../../../shared/models/user-model";

@Component({
  selector: 'tech-write-question',
  templateUrl: './write-question.component.html',
  styleUrls: ['./write-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteQuestionComponent implements OnInit {

  title = new FormControl('', [Validators.required, Validators.minLength(30)]);
  recaptcha = new FormControl('', [Validators.required]);
  tags = new FormControl('', [Validators.required]);

  writeQuestionForm = new FormGroup({title: this.title, tags: this.tags, recaptcha: this.recaptcha});

  editorContent: string;
  action: string;

  @Input()
  loading: boolean;
  @Input()
  loaded: boolean;
  @Input()
  error: any;
  @Output()
  onQuestionActionTriggered = new EventEmitter<any>();

  constructor(public utilService: UtilService) { }

  ngOnInit() {
  }

  postQuestion() {
    this.action = 'post';
    this.onQuestionActionTriggered.emit({
      action: 'post',
      title: this.title.value,
      content: this.editorContent,
      tags: this.tags.value.split(',')
    });
  }

  draftQuestion() {
    this.action = 'draft';
    this.onQuestionActionTriggered.emit({
      action: 'draft',
      title: this.title.value,
      content: this.editorContent,
      tags: this.tags.value.split(',')
    });
  }

  discard() {
    this.title.setValue('');
    this.editorContent = '';
    this.tags.setValue('');
  }

  enableActionButton(): boolean {
    return !this.title.valid || !this.tags.valid || !this.recaptcha.valid || !this.editorContent || this.editorContent.length < 500;
  }

  getCurrentUser() : User {
    return this.utilService.getCurrentUser();
  }

  editorContentHandler(value: any) {
    this.editorContent = this.utilService.encodeHtml(value);
  }

  showQuestionSuccessMessage(): string {
    if (this.loaded && this.action === 'post') {
      return 'Your question has been posted and send to the editor for approval.';
    }
    if (this.loaded && this.action === 'draft') {
      return 'Your question has been saved as draft for further modification.';
    }
  }

  getTitleErrorMessage() {
    return this.title.hasError('required') ? 'Please specify question title' :
      this.title.hasError('minlength') ? 'The question title must be at least 20 character long' :
        '';
  }

  getTagErrorMessage() {
    return this.tags.hasError('required') ? 'Please specify at least one tag' : '';
  }

  showContentErrorMessage(): boolean {
    return this.editorContent === '' ? true :
      this.editorContent.length < 100 ? true :
        false;
  }
}
