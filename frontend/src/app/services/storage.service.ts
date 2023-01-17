import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
    this.emitChange();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  public getToken(): string | null {
    const token = window.sessionStorage.getItem(TOKEN);
    if (token) {
      return token;
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN);
    if (token) {
      return true;
    }
    return false;
  }

  saveUser(user: User) {
    window.sessionStorage.setItem('user', JSON.stringify(user));
    this.emitChange();
  }

  getUser(): User | null {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange() {
    this.emitChangeSource.next(this.getUser());
  }
}
