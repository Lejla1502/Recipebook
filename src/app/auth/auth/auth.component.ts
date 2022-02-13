import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading=false;
  error:string=null;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form: NgForm){
   this.isLoading=true;

   let authObservable:Observable<AuthResponseData>;

    if(this.isLoginMode)
      authObservable=this.authService.login(form.value.email, form.value.password);
    else
      authObservable=this.authService.signUp(form.value.email, form.value.password);
  

    authObservable.subscribe(responseData=>{
      console.log(responseData);
      this.isLoading=false;
      this.error=null;
      this.router.navigate(['/recipes']);
    }, errorMessage=>{
      console.log(errorMessage);
      this.error=errorMessage;
      this.isLoading=false;
    });


    form.reset();
  }

  onHandleError(){
    this.error= null;
  }

}
