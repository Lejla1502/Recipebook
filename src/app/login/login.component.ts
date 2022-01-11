import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  signupForm:FormGroup;

  isValidUsernameOrPassword=true;

  constructor(private userService:UserService, private router:Router, private route:ActivatedRoute) { }


  //why is the form not loading after this part was added 
  ngOnInit(): void {
    console.log("this part is getting executed");
    this.signupForm=new FormGroup({
      'username':new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    const validOrNah=this.userService.checkIfValidUser(this.signupForm.value);
    if(validOrNah) 
    {
      this.isValidUsernameOrPassword=true;
      alert("successful login");
      this.router.navigate([''], {relativeTo: this.route});
    }
    else
      this.isValidUsernameOrPassword=false;
  }

  

}
