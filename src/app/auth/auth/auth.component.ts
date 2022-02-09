import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { onErrorResumeNext } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading=false;
  error:string=null;

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
    }, errorMessage=>{
      console.log(errorMessage);
      this.error=errorMessage;
      this.isLoading=false;
    });
   
    }
    form.reset();
  }

}
