import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public itemList: Item[];
  constructor(private _confirmDialogService: ConfirmDialogService, private _itemService: ItemService) {
    this.getitemlist();
  }

  ngOnInit(): void {
  }


  getitemlist() {
    this._itemService.getItems().subscribe(
      (data: Item[]) => this.itemList = data
    );
  }

  delete(employeeID) {
    this._confirmDialogService.openConfirmDialog("Are you sure you want to delete the item information?")
      .afterClosed().subscribe(res => {
        if (res) {
          this._itemService.deleteItem(employeeID).subscribe(() => {
            this.getitemlist();
          }, error => console.error(error));
        }
      });
  }
}
