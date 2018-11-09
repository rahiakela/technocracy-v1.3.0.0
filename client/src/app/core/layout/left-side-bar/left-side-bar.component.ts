import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {User} from "../../../shared/models/user-model";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'tech-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSideBarComponent implements OnInit {

  @Input()
  user: User;

  constructor(public utilService: UtilService, private cdRef:ChangeDetectorRef) {

  }

  ngOnInit() {  }

}

