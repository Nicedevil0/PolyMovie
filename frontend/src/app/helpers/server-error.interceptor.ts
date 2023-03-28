import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.userService.logout();
          return throwError(() => error);
        } else if (error.status === 0) {
          this.notificationService.showError(`Le serveur n'est pas joignable`);
          return throwError(() => error);
        } else {
          this.notificationService.showError(`Une erreur ${error.status} est survenue : ${error.message}`);
          return throwError(() => error);
        }
      })
    );
  }
}
