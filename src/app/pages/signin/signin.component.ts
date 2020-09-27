/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 09/24/2020
 * Description: Sign-in component ts
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login() {
    const empId = this.form.controls['empId'].value;

    this.router.navigate(['/']);
    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res) {
        this.cookieService.set('session_user', empId, 1);// set the employee id to the cookie session_user name
      } else {
        this.error = 'The employee ID you entered is invalid, please try again.';
      }// if it is invalid output this error
    })
  }
}
