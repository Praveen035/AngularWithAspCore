import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from 'src/models/categories';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/Category/';
  }

  getCategories() {
    return this._http.get(this.myAppUrl + 'Index').pipe(map(
      response => {
        return response;
      }));
  }

  getCategoriesById(id: number) {
    return this._http.get(this.myAppUrl + 'Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveCategory(categories: Categories) {
    return this._http.post(this.myAppUrl + 'Create', categories)
      .pipe(map(
        response => {
          return response;
        }));
  }

  updateCategory(employee: Categories) {
    return this._http.put(this.myAppUrl + 'Edit', employee)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteCategory(id: number) {
    return this._http.delete(this.myAppUrl + 'Delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

}
