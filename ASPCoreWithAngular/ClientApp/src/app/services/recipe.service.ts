import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl + 'api/Recipe/';
  }

  getRecipes() {
    return this._http.get(this.myAppUrl + 'Index').pipe(map(
      response => {
        return response;
      }));
  }

  getRecipeById(id: number) {
    return this._http.get(this.myAppUrl + 'Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveRecipe(recipe: Recipe) {
    return this._http.post(this.myAppUrl + 'Create', recipe)
      .pipe(map(
        response => {
          return response;
        }));
  }

  updateRecipe(recipe: Recipe) {
    return this._http.put(this.myAppUrl + 'Edit', recipe)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteRecipe(id: number) {
    return this._http.delete(this.myAppUrl + 'Delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

}
