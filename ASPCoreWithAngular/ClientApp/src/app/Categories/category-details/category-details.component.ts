import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Categories } from 'src/models/categories';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  public catList: Categories[];

  constructor(private _categoryService: CategoryService, private _confirmDialogService: ConfirmDialogService) {
    this.getCategorieslist();
  }

  ngOnInit(): void {
  }


  getCategorieslist() {
    this._categoryService.getCategories().subscribe(
      (data: Categories[]) => this.catList = data
    );
  }

  delete(employeeID) {
    this._confirmDialogService.openConfirmDialog("Are you sure you want to delete the employee information?")
      .afterClosed().subscribe(res => {
        if (res) {
          this._categoryService.deleteCategory(employeeID).subscribe(() => {
            this.getCategorieslist();
          }, error => console.error(error));
        }
      });
  }
}
