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
import {Blog} from "../../../shared/models/blog-model";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
  selector: 'tech-pending-blog',
  templateUrl: './pending-blog.component.html',
  styleUrls: ['./pending-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingBlogComponent implements OnInit, OnChanges {

  @Input()
  blogList: Blog[] = [];
  @Input()
  loading: boolean;
  @Output()
  onBlogActionTriggered = new EventEmitter<any>();

  dataSource: MatTableDataSource<BlogElement>;
  displayedColumns: string[] = ['position', 'title', 'createdOn', 'star'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    let i = 0;
    const ELEMENT_DATA: BlogElement[] = Object.values(this.blogList)
      .map((blog: any) => {
        return {position: ++i, title: blog.title, createdOn: blog.createdOn}
      });

    this.dataSource = new MatTableDataSource<BlogElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  preview() {
    const blog = this.getSelectedBlog(this.title);
    this.router.navigate(['blog/preview', blog._id, 'pending']);
  }

  publish() {
    this.onBlogActionTriggered.emit({
      action: 'published',
      blogId: this.getSelectedBlog(this.title)._id
    });
  }

  holdOn() {
    this.onBlogActionTriggered.emit({
      action: 'on_hold',
      blogId: this.getSelectedBlog(this.title)._id
    });
  }

  reject() {
    this.onBlogActionTriggered.emit({
      action: 'rejected',
      blogId: this.getSelectedBlog(this.title)._id
    });
  }

  onRowClicked(row) {
    // console.log('Row clicked: ', row);
    this.title = row.title;
  }

  getSelectedBlog(title: string): Blog {
    return Object.values(this.blogList).find(blog => blog.title === this.title);
  }

  formatDate(submitDate: Date) {
    return moment(submitDate).format('MM/DD/YYYY');
  }
}

export interface BlogElement {
  position: number;
  title: string;
  createdOn: Date;
}
