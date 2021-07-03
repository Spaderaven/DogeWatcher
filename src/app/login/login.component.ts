import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private router: Router, private store: AngularFirestore) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  ValidateLoginAction() {
    this.store.collection('users').valueChanges({ idField: 'propertyId' }).subscribe(val => {
      val.forEach((element: any) => {
        if (element.email == this.loginForm.get('email').value && element.password == this.loginForm.get('password').value) {
          this.router.navigate(["/home", {element: element.propertyId}])
        }
      });
    })

  }


  get email()    { return this.loginForm.get('email');    }
  get password() { return this.loginForm.get('password'); }

}
