import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../shared/models/user-model";

@Component({
  selector: 'tech-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  public signOutHandler = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {
  }

  signOut(event: MouseEvent) {
    this.signOutHandler.emit(event);
  }
}
