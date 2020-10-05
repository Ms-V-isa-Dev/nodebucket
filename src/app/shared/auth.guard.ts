/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/24/2020
 * Description: Auth guard ts
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser) {
      return true;// if a session user return true
    } else {
      // if the cookie does not exist take them back to signin page
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
