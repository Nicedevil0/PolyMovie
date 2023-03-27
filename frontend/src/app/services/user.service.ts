import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  login(login: string, password: string): void {
    this.http.post<Login>(this.baseUrl + '/public/login', {login, password}).subscribe(
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
    this.http.post<Login>(this.baseUrl + '/public/register', {login, password}).subscribe(
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

  getFavorites(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/users/favorites');
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/admin/users');
  }

  addToFavorites(movie: Movie): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/users/favorites/' + movie.id, null);
  }

  removeFromFavorites(movie: Movie): Observable<User> {
    return this.http.delete<User>(this.baseUrl + '/users/favorites/' + movie.id);
  }

  delete(userId: number): Observable<User[]> {
    return this.http.delete<User[]>(this.baseUrl + '/admin/users/' + userId);
  }
}
