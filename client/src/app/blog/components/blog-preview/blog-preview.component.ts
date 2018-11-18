import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Blog} from "../../../shared/models/blog-model";
import {UtilService} from "../../../core/services/util.service";
import {Skill} from "../../../shared/models/profile-model";
import * as moment from "moment";

@Component({
  selector: 'tech-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPreviewComponent implements OnInit {

  @Input()
  blog: Blog;
  @Output()
  onBlogActionTriggered = new EventEmitter<any>();

  constructor(public utilService: UtilService) { }

  ngOnInit() {
  }

  post(blogId: string) {
    this.onBlogActionTriggered.emit({
      action: 'post',
      blogId: blogId
    });
  }

  formatDate(submitDate: Date) {
    return moment(submitDate).format('LLL');
  }
}
