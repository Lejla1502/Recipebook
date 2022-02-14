import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //to find first occurence of the PlacehloderDirective in DOM - in auth.component.html
  //we get acces to the directive we use in the template and we store that in alertHost 
  @ViewChild(PlaceholderDirective, {static : false}) alertHost: PlaceholderDirective;

  isLoginMode=true;
  isLoading=false;
  error:string=null;

  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
      this.showErrorAlert(errorMessage);
      this.isLoading=false;
    });


    form.reset();
  }

  onHandleError(){
    this.error= null;
  }

  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef= this.alertHost.viewContainerRef;
    //clearing everything that might've been rendered there before; that is, all Angular components that have been rendered in that place before
    //and we want to clear everything before we add something new
    hostViewContainerRef.clear();

    //here we use our component factoryy to create a new alert component in that host view container reference
    hostViewContainerRef.createComponent(alertCmpFactory);
    //this now creates a new component in that place
  }

}
