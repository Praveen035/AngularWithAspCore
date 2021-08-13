import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'src/app/notification.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/models/recipe';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss']
})
export class RecipeAddComponent implements OnInit {

  recipeForm: FormGroup;
  title = 'Create';
  recipeCategoryId: number;
  errorMessage: any;
  constructor(private confirmDialogService: ConfirmDialogService, private notificationService: NotificationService,
    private recipeService: RecipeService, private _router: Router, private _fb: FormBuilder, private _avRoute: ActivatedRoute) {

    if (this._avRoute.snapshot.params['id']) {
      this.recipeCategoryId = this._avRoute.snapshot.params['id'];
    }

    this.recipeForm = this._fb.group({
      recipeCategoryId: 0,
      recipeCategoryCode: ['', [Validators.required]],
      recipeCategoryName: ['', [Validators.required]],
      recipeCode: ['', [Validators.required]],
      recipeName: ['', [Validators.required]],
      recipeImage: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    if (this.recipeCategoryId > 0) {
      this.title = 'Edit';
      this.recipeService.getRecipeById(this.recipeCategoryId)
        .subscribe((response: Recipe) => {
          this.recipeForm.setValue(response);
        }, error => console.error(error));
    }
  }


  save() {

    if (!this.recipeForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this.confirmDialogService.openConfirmDialog("Are you sure you want to add the category information?")
        .afterClosed().subscribe(res => {
          if (res) {
            this.recipeService.saveRecipe(this.recipeForm.value)
              .subscribe(() => {
                this.showToasterSuccess();
                this._router.navigate(['/RecipeDetails']);
              }, error => console.error(error));
          }
        });
    } else if (this.title === 'Edit') {
      this.confirmDialogService.openConfirmDialog("Are you sure you want to update the category information?")
        .afterClosed().subscribe(res => {
          if (res) {

            this.recipeService.updateRecipe(this.recipeForm.value)
              .subscribe(() => {
                this._router.navigate(['/RecipeDetails']);
              }, error => console.error(error));
          }
        });
    }
  }

  showToasterSuccess() {
    this.notificationService.showSuccess("Recipe Details added successfully !!", "")
  }

  cancel() {
    this._router.navigate(['/dashboard']);
  }

  get recipeCategoryCode() { return this.recipeForm.get('recipeCategoryCode'); }
  get recipeCategoryName() { return this.recipeForm.get('recipeCategoryName'); }
  get recipeCode() { return this.recipeForm.get('recipeCode'); }
  get recipeName() { return this.recipeForm.get('recipeName'); }
  get recipeImage() { return this.recipeForm.get('recipeImage'); }
}
