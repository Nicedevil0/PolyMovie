import { Category } from './../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/public/categories');
  }

  getByCode(code: string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + '/public/categories/' + code);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + '/admin/categories', category);
  }

  delete(category: string) {
    return this.http.delete(this.baseUrl + '/admin/categories/' + category);
  }
}
