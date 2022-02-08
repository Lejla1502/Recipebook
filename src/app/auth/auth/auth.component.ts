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
  isLoading=false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form: NgForm){
   this.isLoading=true;
    if(this.isLoginMode)
    {
      //..
    }
    else{
    this.authService.signUp(form.value.email, form.value.password)
    .subscribe(responseData=>{
      console.log(responseData);
      this.isLoading=false;
    }, error=>{
      console.log(error);
    });
   
    }
    form.reset();
  }

}
