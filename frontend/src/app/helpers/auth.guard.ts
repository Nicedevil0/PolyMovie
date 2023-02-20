import { StorageService } from './../services/storage.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private userService: UserService,
              private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
    if(this.storageService.isLoggedIn()) {
      const userRole = this.userService.getRole();
      if(route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    } else {
      if(route.data['roles'] && route.data['roles'].length === 0) {
        return true;
      }
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
