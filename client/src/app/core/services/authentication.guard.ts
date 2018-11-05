import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UtilService} from "./util.service";

/**
 * Prevent unauthorized activating and forwarding to login route
 * @class AuthenticatedGuard
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private utilService: UtilService, public router: Router) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // select authenticated observable from store
    let isAuthenticated = false;

    if (!this.utilService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    } else {
      isAuthenticated = true;
    }

    return isAuthenticated;
  }
}
