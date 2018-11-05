import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Blog} from '../../../shared/models/blog-model';
import {UtilService} from '../../../core/services/util.service';
import {Skill} from "../../../shared/models/profile-model";

@Component({
  selector: 'tech-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent implements OnInit {

  @Input()
  blog: Blog;

  constructor(private utilService: UtilService) { }

  ngOnInit() {
  }

  showSkillsWithHashTag(skills: Skill[]) {
    return skills!== null ? this.utilService.getSkillWithHashTag(skills): '';
  }
}
