import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user-model";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'tech-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSideBarComponent implements OnInit, OnChanges {

  @Input()
  user: User;

  navList: NavList[];
  // currentUserId: string;

  constructor(public utilService: UtilService) {

  }

  ngOnInit() {
    let profileId = 'create';
    if (this.user) {
      profileId = this.user.profile === undefined ? 'create' : this.user.profile._id;
    }

    // preparing nav item list
    this.navList = [
      {
        categoryName: 'Profile', icon: 'perm_identity',
        subCategory: [
          {subCategoryName: 'My Profile', icon: 'perm_identity', link: '/profile/view', params: profileId}
        ]
      },

      {
        categoryName: 'Blog', icon: 'note',
        subCategory: [
          {subCategoryName: 'Write Blog', icon: 'note_add', link: '/blog/write', params: 'new'},
          {subCategoryName: 'My Blog', icon: 'note', link: '/blog/list', params: 'view'}
        ]
      },
      {
        categoryName: 'Question', icon: 'help',
        subCategory: [
          {subCategoryName: 'Ask Question', icon: 'create', link: '/question/write', params: 'new'},
          {subCategoryName: 'My Question', icon: 'help', link: '/question/list', params: 'view'}
        ]
      },
      {
        categoryName: 'Network', icon: 'group',
        subCategory: [
          {subCategoryName: 'Followers', icon: 'people', link: 'followers', params: 'profile_id'},
          {subCategoryName: 'Following', icon: 'people', link: 'following', params: 'profile_id'}
        ]
      },
      {
        categoryName: 'Settings', icon: 'settings',
        subCategory: [
          {subCategoryName: 'Settings', icon: 'settings', link: 'settings', params: 'profile_id'}
        ]
      }
    ];
  }

  ngOnChanges() {
    // Add admin menu option if the user's role is admin
    if (this.user && this.user.role === 'admin') {
      const adminNavItem = {
        categoryName: 'Admin', icon: 'person',
        subCategory: [
          {subCategoryName: 'Pending Blog', icon: 'note', link: '/blog/pending', params: 'view'},
          {subCategoryName: 'Pending Question', icon: 'help', link: '/question/pending', params: 'view'}
        ]
      };

      // Add 'Admin' to 0 index position
      // this.navList.unshift(adminNavItem);
    } /*else {
      // Find the index position of "Admin," then remove it from that position
      this.navList.splice(this.navList[0].categoryName.indexOf('Admin'), 1);
    }*/
  }

}


export class NavList {
  categoryName: string;
  icon: string;
  link?: string;
  subCategory?: NavItem[];

  constructor(_categoryName: string, _icon: string, _subCategory: NavItem[]) {
    this.categoryName = _categoryName;
    this.icon = _icon;
    this.subCategory = _subCategory;
  }
}

export class NavItem {
  subCategoryName: string;
  icon: string;
  link: string;
  params?: any;
}
