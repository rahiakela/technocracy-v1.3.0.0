import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChange, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Blog} from '../../../shared/models/blog-model';
import {UtilService} from '../../../core/services/util.service';
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import * as moment from 'moment';
import {Skill} from "../../../shared/models/profile-model";

@Component({
  selector: 'tech-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogViewComponent implements OnInit, OnChanges {

  @ViewChild('richTextEditor')
  richTextEditor: ElementRef;

  @Input()
  blog: Blog;

  @Output()
  onBlogActionTriggered = new EventEmitter<any>();

  blogContent = {
    action: '',
    blogId: '',
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
    // add meta tag into page header
    this.addMetaTag();
  }

  ngOnChanges(changes: SimpleChanges) {
    // select blog using blog id
    const blog: SimpleChange = changes.blog;
    // console.log('prev value: ', blog.previousValue);
    // console.log('got name: ', blog.currentValue);
    this.blog = blog.currentValue;
  }

  like() {
    // redirect to login page if the user is not logged in
    if (!this.utilService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }

    this.onBlogActionTriggered.emit({
      action: 'like',
      content: '',
      notification: this.notification
    });

    // reset blog content to default state
    this.resetBlogContent();
  }

  addComment() {

    // redirect to login page if the user is not logged in
    if (!this.utilService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }

    // comment content to blog content object
    Object.assign(this.blogContent, {
      content: this.editorContent,
      notification: this.notification
    });

    // if the action type is empty then it is for comment
    if (this.blogContent.action === '') {
      Object.assign(this.blogContent, {action: 'comment'});
    }

    this.onBlogActionTriggered.emit(this.blogContent);
    // reset blog content to default state
    this.resetBlogContent();
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

    // assign comment output to blog content object and emit the event if the action is not for comment's reply
    Object.assign(this.blogContent, value);
    this.onBlogActionTriggered.emit(this.blogContent);
  }

  resetBlogContent() {
    this.blogContent = {
      action: '',
      blogId: '',
      commentId: '',
      replyId: '',
      content: '',
      notification: false
    };
  }

  formatDate(submitDate: Date) {
    return moment(submitDate).format('LLL');
  }

  addMetaTag() {
    if (this.blog) {
      // SEO metadata
      this.titleService.setTitle(this.blog.title);
      this.meta.addTag({name: 'description', content: this.blog.description});

      /*
      * 1-https://alligator.io/angular/meta-tags/
      * 2-http://www.talkingdotnet.com/how-to-set-html-meta-tags-using-angular-4/
      * */
      // setting page's meta tag
      this.meta.updateTag({property: 'og:title', content: this.blog.title});
      this.meta.updateTag({property: 'og:description', content: this.blog.description});
      this.meta.updateTag({property: 'og:url', content: `https://www.tecknocracy.com/blog/${this.blog._id}`});
      this.meta.updateTag({property: 'og:image', content: this.blog.image});
      this.meta.updateTag({property: 'og:image:secure_url', content: 'https://s3.amazonaws.com/tecknocracy/images/technocracy.png'});
      this.meta.updateTag({property: 'article:published_time', content: this.blog.publishedOn === null ? '' : moment(this.blog.publishedOn, 'YYYYMMDDHHmmss').toString()});
      this.meta.updateTag({property: 'article:modified_time', content: this.blog.updatedOn === null ? '' : moment(this.blog.updatedOn, 'YYYYMMDDHHmmss').toString()});

      // adding all blog keywords into  article tag
      this.blog.tags.forEach(tag => {
        this.meta.addTag({property: 'article:tag', content: tag});
      });

      // Twitter metadata
      // this.meta.addTag({name: 'twitter:card', content: 'summary'});
      // this.meta.addTag({name: 'twitter:site', content: '@tecknocracy_inc'});
      this.meta.updateTag({name: 'twitter:title', content: this.blog.title});
      this.meta.updateTag({name: 'twitter:description', content: this.blog.description});
      this.meta.updateTag({name: 'twitter:text:description', content: this.blog.content.length > 300 ? this.utilService.stripedHtml(this.blog.content.substring(0, 300)) : this.utilService.stripedHtml(this.blog.content)});
      this.meta.updateTag({name: 'twitter:url', content: `https://www.tecknocracy.com/blog/${this.blog._id}`});
      this.meta.updateTag({name: 'twitter:image', content: this.blog.image});
    }
  }
}
