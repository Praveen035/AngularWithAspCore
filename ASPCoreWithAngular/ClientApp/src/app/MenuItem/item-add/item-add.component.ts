import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/models/menu-item';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private _router: Router, private _fb: FormBuilder) {


    this.itemForm = this._fb.group({
      ItemId: 0,
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Stock_Quantity: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      // city: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  cancel() {
    this._router.navigate(['/dashboard']);
  }

  get Name() { return this.itemForm.get('Name'); }
  get Price() { return this.itemForm.get('Price'); }
  get Stock_Quantity() { return this.itemForm.get('Stock_Quantity'); }
  get Status() { return this.itemForm.get('Status'); }
}
