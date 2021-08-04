import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { NotificationService } from 'src/app/notification.service';
import { CategoryService } from 'src/app/services/category.service';
import { Categories } from 'src/models/categories';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryForm: FormGroup;
  title = 'Create';
  categoryId: number;
  errorMessage: any;

  constructor(private _router: Router, private _fb: FormBuilder, private _categoryService: CategoryService,
    private confirmdialogService: ConfirmDialogService, private notifyService: NotificationService, private _avRoute: ActivatedRoute) {

    if (this._avRoute.snapshot.params['id']) {
      this.categoryId = this._avRoute.snapshot.params['id'];
    }

    this.categoryForm = this._fb.group({
      categoryId: 0,
      categoryCode: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    if (this.categoryId > 0) {
      this.title = 'Edit';
      this._categoryService.getCategoriesById(this.categoryId)
        .subscribe((response: Categories) => {
          this.categoryForm.setValue(response);
        }, error => console.error(error));
    }
  }

  save() {

    if (!this.categoryForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this.confirmdialogService.openConfirmDialog("Are you sure you want to add the category information?")
        .afterClosed().subscribe(res => {
          if (res) {
            this._categoryService.saveCategory(this.categoryForm.value)
              .subscribe(() => {
                this.showToasterSuccess();
                this._router.navigate(['/CategoryDetails']);
              }, error => console.error(error));
          }
        });
    } else if (this.title === 'Edit') {
      this.confirmdialogService.openConfirmDialog("Are you sure you want to update the category information?")
        .afterClosed().subscribe(res => {
          if (res) {

            this._categoryService.updateCategory(this.categoryForm.value)
              .subscribe(() => {
                this._router.navigate(['/CategoryDetails']);
              }, error => console.error(error));
          }
        });
    }
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Employee Details added successfully !!", "")
  }

  cancel() {
    this._router.navigate(['/dashboard']);
  }

  get categoryCode() { return this.categoryForm.get('categoryCode'); }
  get categoryName() { return this.categoryForm.get('categoryName'); }

}
