import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup;
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log("this part is getting executed");
    this.forgotPasswordForm=new FormGroup({
      'password':new FormControl(null, Validators.required),
      'repeat_password': new FormControl(null, Validators.required)
    });
  }

  onSubmit()
  {
    if(this.forgotPasswordForm.value.password===this.forgotPasswordForm.value.repeat_password)
       this.router.navigate(['/login']);
       else
       alert("potrebno je da se lozinke podudaraju");
  }


  isPasswordValid(control:FormControl):Promise<any> | Observable<any>{
    const promise=new Promise<any>((resolve,reject)=>{
      setTimeout(() => {
        if(control.value===this.forgotPasswordForm.value.repeat_password)
          resolve({'passwordIsvalid':true});
        else
          resolve(null);
      }, 1500);
    });

    return promise;
  }
}
