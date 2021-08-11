import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/models/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  public recipeList: Recipe[];

  constructor(private _confirmDialogService: ConfirmDialogService, private _recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  getRecipelist() {
    this._recipeService.getRecipes().subscribe(
      (data: Recipe[]) => this.recipeList = data
    );

  }

  delete(recipeID) {
    this._confirmDialogService.openConfirmDialog("Are you sure you want to delete the category information?")
      .afterClosed().subscribe(res => {
        if (res) {
          this._recipeService.deleteRecipe(recipeID).subscribe(() => {
            this.getRecipelist();
          }, error => console.error(error));
        }
      });
  }
}
