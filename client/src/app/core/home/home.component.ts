import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Blog} from '../../shared/models/blog-model';
import {UtilService} from '../services/util.service';
import {Skill} from "../../shared/models/profile-model";

@Component({
  selector: 'tech-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  @Input()
  blogs: Blog[];
  @Input()
  searching = false;
  @Input()
  error = '';

  constructor(private utilService: UtilService) {

  }

  ngOnInit() {

  }

  showSkillsWithHashTag(skills: Skill[]) {
    return this.utilService.getSkillWithHashTag(skills);
  }
}
