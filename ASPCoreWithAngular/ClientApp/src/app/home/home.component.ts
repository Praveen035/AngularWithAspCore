import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  cancel() {
    this._router.navigate(['/registration']);
  }
  msg: string = "";
  check() {
    var uname = (<HTMLInputElement>document.getElementById('userName')).value;
    var pwd = (<HTMLInputElement>document.getElementById('Password')).value;
    console.log(uname, pwd);
    var output = this.loginService.checkusernameandpassword(uname, pwd);
    if (output == true) {
      this._router.navigate(['/dashboard']);
    }
    else {
      this.msg = 'Invalid username or password';
    }
  }
}
