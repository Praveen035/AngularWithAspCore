import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {

  itemForm: FormGroup;
  title = 'Create';
  itemId: number;

  constructor(private _router: Router, private _fb: FormBuilder, private _itemService: ItemService,
    private notifyService: NotificationService, private _avRoute: ActivatedRoute, private _confirmDialogService: ConfirmDialogService) {

    if (this._avRoute.snapshot.params['id']) {
      this.itemId = this._avRoute.snapshot.params['id'];
    }

    this.itemForm = this._fb.group({
      itemId: 0,
      itemCode: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.itemId > 0) {
      this.title = 'Edit';
      this._itemService.getItemById(this.itemId)
        .subscribe((response: Item) => {
          this.itemForm.setValue(response);
        }, error => console.error(error));
    }
  }

  save() {

    if (!this.itemForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this._confirmDialogService.openConfirmDialog("Are you sure you want to add the category information?")
        .afterClosed().subscribe(res => {
          if (res) {
            this._itemService.saveItem(this.itemForm.value)
              .subscribe(() => {
                this.showToasterSuccess();
                this._router.navigate(['/ItemDetails']);
              }, error => console.error(error));
          }
        });
    } else if (this.title === 'Edit') {
      this._confirmDialogService.openConfirmDialog("Are you sure you want to update the category information?")
        .afterClosed().subscribe(res => {
          if (res) {

            this._itemService.updateItem(this.itemForm.value)
              .subscribe(() => {
                this._router.navigate(['/ItemDetails']);
              }, error => console.error(error));
          }
        });
    }
  }


  cancel() {
    this._router.navigate(['/dashboard']);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Employee Details added successfully !!", "")
  }

  get itemCode() { return this.itemForm.get('itemCode'); }
  get itemName() { return this.itemForm.get('itemName'); }
  get status() { return this.itemForm.get('status'); }

}
