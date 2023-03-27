import { Director } from './../models/director.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Director[]> {
    return this.http.get<Director[]>(this.baseUrl + '/public/directors');
  }
}
