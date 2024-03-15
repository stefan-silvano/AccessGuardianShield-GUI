import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');

    if (token) {
      return this.authService.isAdmin().then((isAdmin) => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }).catch((error) => {
        console.error('Error:', error);
        return false;
      });
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
