import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user-model';
import {UtilService} from '../../../core/services/util.service';
import {Blog} from '../../../shared/models/blog-model';

@Component({
  selector: 'tech-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBlogComponent implements OnInit {

  title = new FormControl('', [Validators.required, Validators.minLength(30)]);
  recaptcha = new FormControl('', [Validators.required]);
  tags = new FormControl('', [Validators.required]);

  editBlogForm = new FormGroup({title: this.title, tags: this.tags, recaptcha: this.recaptcha});

  editorContent: string;
  contentToUpdate: string;
  isEdited = false;

  @Input()
  blog: Blog;
  @Input()
  loading: boolean;
  @Input()
  loaded: boolean;
  @Input()
  error: any;
  @Output()
  onBlogActionTriggered = new EventEmitter<any>();

  constructor(public utilService: UtilService) { }

  ngOnInit() {
    if (this.blog) {
      this.title.setValue(this.blog.title);
      this.contentToUpdate = this.blog.content;
      this.tags.setValue(this.blog.tags);
    }
  }

  editBlog() {
    this.onBlogActionTriggered.emit({
      blogId: this.blog._id,
      title: this.title.value,
      content: this.editorContent,
      tags: this.tags.value
    });
    this.isEdited = true;
  }

  enableActionButton(): boolean {
    return !this.title.valid || !this.tags.valid || !this.recaptcha.valid || !this.editorContent || this.editorContent.length < 500;
  }

  getCurrentUser(): User {
    return this.utilService.getCurrentUser();
  }

  editorContentHandler(value: any) {
    this.editorContent = this.utilService.encodeHtml(value);
  }

  showBlogSuccessMessage(): string {
    if (this.loaded && this.isEdited) {
      return 'Your blog has been updated successfully.';
    }
  }

  getTitleErrorMessage() {
    return this.title.hasError('required') ? 'Please specify blog title' :
      this.title.hasError('minlength') ? 'The blog title must be at least 30 character long' :
        '';
  }

  getTagErrorMessage() {
    return this.tags.hasError('required') ? 'Please specify at least one tag' : '';
  }

  showContentErrorMessage(): boolean {
    return this.editorContent === '' ? true :
      this.editorContent.length < 500 ? true :
        false;
  }
}
