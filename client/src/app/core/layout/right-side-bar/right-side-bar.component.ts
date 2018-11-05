import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../shared/models/question-model';

@Component({
  selector: 'tech-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {

  @Input()
  questions: Question[];

  constructor() { }

  ngOnInit() {
  }

}
