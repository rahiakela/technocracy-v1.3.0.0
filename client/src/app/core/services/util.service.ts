import { Injectable } from '@angular/core';
import {User} from '../../shared/models/user-model';
import {select, Store} from '@ngrx/store';
import { RootStoreState} from '../../root-store';
import { AuthSelectors } from '../../root-store/auth-store';
import {Employment, Skill} from '../../shared/models/profile-model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private store$: Store<RootStoreState.State>) {
  }

  getCurrentUser(): User {
    let authenticatedUser: User;
    // select authenticated user from store
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => authenticatedUser = user);

    return authenticatedUser;
  }

  isAuthenticated(): boolean {
    let isAuthenticated = false;
    // select authenticated user from store
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe(user => {
        // if user is present then get JWT token
        if (user) {
          isAuthenticated = true;
        }
      });

    return isAuthenticated;
  }

  getAuthToken(): string {
    let authToken: string;
    // select authenticated user from store
    this.store$.pipe(select(AuthSelectors.selectAuthenticatedUser))
      .subscribe((user: User) => {
        // if user is present then get JWT token
        if (user) {
          authToken = user.jwtToken;
        }
      });

    return authToken;
  }

  getSkillWithHashTag(skills: Skill[]) {
    let skillSet = '';

    if (skills !== null && skills.length >0) {
      skills.forEach(value => {
        skillSet = skillSet + '#' + value.skill + ' ';
      });
    }

    return skillSet;
  }

  getUserName(user: any): string {

    if (user === null || user.local === null) {
      return '';
    }

    if (user.local.name != null) {
      return user.local.name;
    }
    if (user.facebook.name != null) {
      return user.facebook.name;
    }
    if (user.google.name != null) {
      return user.google.name;
    }
    if (user.linkedin.name != null) {
      return user.linkedin.name;
    }

    return '';
  }

  getUserIcon(user: any): string {

    if (user === null || user.local === null) {
      return '';
    }

    if (user.local.image != null) {
      return user.local.image;
    }
    if (user.facebook.image != null) {
      return user.facebook.image;
    }
    if (user.google.image != null) {
      return user.google.image;
    }
    if (user.linkedin.image != null) {
      return user.linkedin.image;
    }

    return '';
  }

  getUserDesignation(emploments: Employment[]) {
    return emploments !== null && emploments.length > 0 ? emploments.find(emp => emp.currentEmployer === true).designation : '';
  }

  getUserCompany(emploments: Employment[]) {
    return emploments !== null && emploments.length > 0 ? emploments.find(emp => emp.currentEmployer === true).company : '';
  }

  getUserWithUpdatedImagePath(user: any, imagePath: string): User {
    if (user.local.name != null) {
      Object.assign(user.local, {'image': imagePath});
    }
    if (user.facebook.name != null) {
      Object.assign(user.facebook, {'image': imagePath});
    }
    if (user.google.name != null) {
      Object.assign(user.google, {'image': imagePath});
    }
    if (user.linkedin.name != null) {
      Object.assign(user.linkedin, {'image': imagePath});
    }

    return user;
  }

  encodeHtml(str): string {
    if (!str) {
      return '';
    }
    const html = str.replace(/[^a-z0-9A-Z ]/g, c => {
      return '&#' + c.charCodeAt() + ';';
    });
    return html;
  }

  // ref-https://gist.github.com/CatTail/4174511
  decodeHTML(str) {
    if (str) {
      return str.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec);
      });
    }
    return;
  }

  // ref: https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
  stripedHtml(html) {
    if (html) {
      const stripedHtml = html.replace(/<[^>]+>/g, '');
      const decodedStripedHtml = this.decodeHTML(stripedHtml);
      return decodedStripedHtml;
    }
    return;
  }
}
