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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.storageService.getToken()) {
      this.userService.getCurrent().subscribe(
        (user) => {
          return true;
        }
      );
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
