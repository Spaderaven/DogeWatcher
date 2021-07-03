import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private router: Router,) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  ValidateLoginAction() {

  }


  get email()    { return this.loginForm.get('email');    }
  get password() { return this.loginForm.get('password'); }

}
