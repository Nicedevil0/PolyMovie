import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/public/movies');
  }

  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.baseUrl + '/public/movies/' + id);
  }

  getByCategory(category: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/public/movies/category/' + category);
  }

  getByActor(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/public/movies/actor/' + id);
  }

  getPrevMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.baseUrl + '/public/movies/prev/' + id);
  }

  getNextMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.baseUrl + '/public/movies/next/' + id);
  }

  getCharactersOfMovie(id: number): Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl + '/public/movies/' + id + '/characters');
  }

  delete(movieId: number) {
    return this.http.delete(this.baseUrl + '/admin/movies/' + movieId);
  }
}
