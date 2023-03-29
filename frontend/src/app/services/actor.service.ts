import { Actor } from './../models/actor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.baseUrl + '/public/actors');
  }

  getById(id: number): Observable<Actor> {
    return this.http.get<Actor>(this.baseUrl + '/public/actors/' + id);
  }

  save(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.baseUrl + '/admin/actors', actor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/admin/actors/' + id);
  }
}
