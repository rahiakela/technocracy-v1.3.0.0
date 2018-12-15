import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../shared/models/question-model';
import {Blog} from '../../../shared/models/blog-model';

@Component({
  selector: 'tech-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {

  @Input()
  questions: Question[];
  @Input()
  relatedBlog: Blog[];

  constructor() { }

  ngOnInit() {
  }

}
