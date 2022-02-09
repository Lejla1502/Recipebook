import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { UserService } from "src/app/user.service";

//defining this interface is optional, but it is a good practice in Angular to define the type of data we're working with
interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http:HttpClient, private userService:UserService){}
    
    error=null;

    signUp(email:string, password:string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHXLqFoZLCzy04Ywy58_zJKK4h7UNxvAM',
        {
            email:email,
             password:password, 
             returnSecureToken:true
        }
        ).pipe(catchError(errorRes=>{
            let errorMessage="An unknown error ocurred!";
            if(!errorRes.error || !errorRes.error.error) //if error response doesn't have error key or if it doesn't have error key on the error key
                   return throwError(() => new Error(errorMessage));      //we can't access the message because the error we''re getting seems to be in a different format
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                  errorMessage="Email already exists";
                //   case 'OPERATION_NOT_ALLOWED':
                //     errorMessage="Operation not allowed";
                //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                //       errorMessage="Too many wrong attempts. Try again later.";   
              }

              return throwError(() => new Error(errorMessage));
        }));
    }

}