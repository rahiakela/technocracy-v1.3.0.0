import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user-model';
import {UtilService} from '../../core/services/util.service';

@Component({
  selector: 'tech-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent implements OnInit {

  @Input()
  user: User;

  constructor(private utilService: UtilService) { }

  ngOnInit() {
  }

  getUserIcon(user: User): string {
    return this.utilService.getUserIcon(user);
  }

}
