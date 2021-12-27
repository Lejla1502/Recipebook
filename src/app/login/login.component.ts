import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm:FormGroup;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      'username':new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    const validOrNah=this.userService.checkIfValidUser(this.signupForm.value);
    console.log(this.signupForm);
  }

}
