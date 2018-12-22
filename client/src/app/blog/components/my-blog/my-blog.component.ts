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
import {Blog} from '../../../shared/models/blog-model';
import * as moment from 'moment';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'tech-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyBlogComponent implements OnInit, OnChanges {

  @Input()
  blogList: Blog[] = [];
  @Input()
  loading: boolean;
  @Output()
  onBlogActionTriggered = new EventEmitter<any>();

  dataSource: MatTableDataSource<BlogElement>;
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
    const ELEMENT_DATA: BlogElement[] = Object.values(this.blogList).map((blog: any) => {
      return {position: ++i, title: blog.title, status: blog.status, createdOn: blog.createdOn };
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
    this.router.navigate(['blog/preview', blog._id, 'my-blog']);
  }

  edit() {
    const blog = this.getSelectedBlog(this.title);
    this.router.navigate(['blog/edit', blog._id]);
  }

  post() {
    this.onBlogActionTriggered.emit({
      action: 'post',
      blogId: this.getSelectedBlog(this.title)._id
    });
  }

  delete() {
    this.onBlogActionTriggered.emit({
      action: 'delete',
      blogId: this.getSelectedBlog(this.title)._id
    });
  }

  onRowClicked(row) {
    // console.log('Row clicked: ', row);
    this.status = row.status;
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
  title: string;
  position: number;
  createdOn: Date;
  status: string;
}
