import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    console.log("this part is getting executed");
    this.forgotPasswordForm=new FormGroup({
      'password':new FormControl(null, Validators.required),
      'repeat_password': new FormControl(null, Validators.required)
    });
  }

  onSubmit()
  {

  }

}
