import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/Item/';
  }


  getItems() {
    return this._http.get(this.myAppUrl + 'Index').pipe(map(
      response => {
        return response;
      }));
  }

  getItemById(id: number) {
    return this._http.get(this.myAppUrl + 'Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveItem(item: Item) {
    return this._http.post(this.myAppUrl + 'Create', item)
      .pipe(map(
        response => {
          return response;
        }));
  }

  updateItem(item: Item) {
    return this._http.put(this.myAppUrl + 'Edit', item)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteItem(id: number) {
    return this._http.delete(this.myAppUrl + 'Delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

}
