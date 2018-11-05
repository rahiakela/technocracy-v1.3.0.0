import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../core/services/util.service";
import {User} from "../../../shared/models/user-model";
import {Question} from "../../../shared/models/question-model";

@Component({
  selector: 'tech-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  title = new FormControl('', [Validators.required, Validators.minLength(30)]);
  recaptcha = new FormControl('', [Validators.required]);
  tags = new FormControl('', [Validators.required]);

  editQuestionForm = new FormGroup({title: this.title, tags: this.tags, recaptcha: this.recaptcha});

  editorContent: string;
  contentToUpdate: string;
  isEdited = false;

  @Input()
  question: Question;
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
    if (this.question) {
      this.title.setValue(this.question.title);
      this.contentToUpdate = this.question.content;
      this.tags.setValue(this.question.tags);
    }
  }

  editQuestion() {

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
    if (this.loaded && this.isEdited) {
      return 'Your question has been updated successfully.';
    }
  }

  getTitleErrorMessage() {
    return this.title.hasError('required') ? 'Please specify question title' :
      this.title.hasError('minlength') ? 'The question title must be at least 30 character long' :
        '';
  }

  getTagErrorMessage() {
    return this.tags.hasError('required') ? 'Please specify at least one tag' : '';
  }

  showContentErrorMessage(): boolean {
    return this.editorContent === '' ? true :
      this.editorContent.length < 200 ? true :
        false;
  }
}
