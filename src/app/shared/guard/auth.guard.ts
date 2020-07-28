import { Injectable } from '@angular/core';
import { CanActivate,
    ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLogggedIn  = false;
      isLogggedIn = this.authService.isLoggedIn;
      const self = this;
      setTimeout(function() {
        if (isLogggedIn !== true) {
          self
          .router.navigate(['sign-in']);
        }
      }, 1000);
      return true;
  }
}
