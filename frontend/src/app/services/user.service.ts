import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  login(login: string, password: string): void {
    this.http.post<Login>(this.baseUrl + '/login', {login, password}).subscribe(
      (login) => {
        this.storageService.saveToken(login.token);
        this.getCurrent().subscribe((user) => {
          this.storageService.saveUser(user);
        });
        this.redirectToMainPage();
      }
    );
  }

  register(login: string, password: string): void {
    this.http.post<Login>(this.baseUrl + '/register', {login, password}).subscribe(
      (login) => {
        this.storageService.saveToken(login.token);
        this.getCurrent().subscribe((user) => {
          this.storageService.saveUser(user);
        });
        this.redirectToMainPage();
      }
    );
  }

  logout(): void {
    this.storageService.clean();
    this.redirectToMainPage();
  }

  private getCurrent(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/user');
  }

  getRole(): string | undefined {
    return this.storageService.getUser()?.role;
  }

  redirectToMainPage() {
    this.router.navigate(['/']);
  }
}
