import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/models/employee';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: UntypedFormGroup;
  title = 'Create';
  employeeId: number;
  errorMessage: any;

  constructor(private _fb: UntypedFormBuilder, private _avRoute: ActivatedRoute, private notifyService: NotificationService,
    private _employeeService: EmployeeService, private _router: Router, private confirmdialogService: ConfirmDialogService) {
    if (this._avRoute.snapshot.params['id']) {
      this.employeeId = this._avRoute.snapshot.params['id'];
    }

    this.employeeForm = this._fb.group({
      employeeId: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      city: ['']
    })
  }

  ngOnInit() {

    if (this.employeeId > 0) {
      this.title = 'Edit';
      this._employeeService.getEmployeeById(this.employeeId)
        .subscribe((response: Employee) => {
          this.employeeForm.setValue(response);
        }, error => console.error(error));
    }
  }

  save() {

    if (!this.employeeForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this.confirmdialogService.openConfirmDialog("Are you sure you want to add the employee information?")
        .afterClosed().subscribe(res => {
          if (res) {
            this._employeeService.saveEmployee(this.employeeForm.value)
              .subscribe(() => {
                this.showToasterSuccess();
                this._router.navigate(['/fetch-employee']);
              }, error => console.error(error));
          }
        });
    } else if (this.title === 'Edit') {
      this.confirmdialogService.openConfirmDialog("Are you sure you want to update the employee information?")
        .afterClosed().subscribe(res => {
          if (res) {

            this._employeeService.updateEmployee(this.employeeForm.value)
              .subscribe(() => {
                this._router.navigate(['/fetch-employee']);
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

  get name() { return this.employeeForm.get('name'); }
  get gender() { return this.employeeForm.get('gender'); }
  get department() { return this.employeeForm.get('department'); }
}
