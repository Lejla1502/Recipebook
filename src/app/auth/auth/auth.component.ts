import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form: NgForm){
    console.log(form.value);

    this.authService.signUp(form.value.email, form.value.password).subscribe(response=>{console.log("Correctly done");});
    form.reset();


  }

}
