import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/models/employee';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-fetch-employee',
  templateUrl: './fetch-employee.component.html',
  styleUrls: ['./fetch-employee.component.scss']
})
export class FetchEmployeeComponent {

  public empList: Employee[];

  constructor(private _employeeService: EmployeeService, private _router: Router, private confirmdialogService: ConfirmDialogService) {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe(
      (data: Employee[]) => this.empList = data
    );
  }

  delete(employeeID) {
    this.confirmdialogService.openConfirmDialog("Are you sure you want to delete the employee information?")
      .afterClosed().subscribe(res => {
        if (res) {
          this._employeeService.deleteEmployee(employeeID).subscribe(() => {
            this.getEmployees();
          }, error => console.error(error));
        }
      });
  }
}
