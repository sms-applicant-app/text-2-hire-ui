import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let userData: any = localStorage.getItem('appUserData');
    if(userData) {
      userData = JSON.parse(userData);
      if(userData.role === 'admin') {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['/store']);
      }
      return false;
    } else {
      return true;
    }
  }
}
