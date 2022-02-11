import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { UserService } from "src/app/user.service";
import { User } from "./user.model";

//defining this interface is optional, but it is a good practice in Angular to define the type of data we're working with
export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    //this informs all places in app about when our user changes
    user=new BehaviorSubject<User>(null); //null - because we don't want to start off with user
    

    //BehaviorSubject behaves like Subject; the difference is that BehaviorSubject also gives subscribers immediate access 
    //to the previously emitted value even if they haven't subscribed at that point of time that value was emitted
    //That means we can get access to the currentky active user even if we only subscribe after that user has been emitted
    //So this means when we fetch data and we need that token at this point in time, even if the user logged in before that point of time
    //which will have benn the case, we get access to that latest user

    //token:string=null;
    
    constructor(private http:HttpClient, private userService:UserService, private router:Router){}
    
    error=null;

    signUp(email:string, password:string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHXLqFoZLCzy04Ywy58_zJKK4h7UNxvAM',
        {
            email:email,
             password:password, 
             returnSecureToken:true
        }
        ).pipe(catchError( this.handleError), tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    login(email:string, password:string){
      
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHXLqFoZLCzy04Ywy58_zJKK4h7UNxvAM',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError( this.handleError), tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
            //getting the current date and on that we call getTime, which is current timestamp in miliseconds 
            //and to that we add resData.expiresIn which we have to convert to number by adding an extra plus in front of it
            //and then we multiply it by 1000 because expiresIn is in seconds and we need miliseconds (and by multiplying we get miliseconds)
           //this is how we get expiration date in miliseconds and by wrapping this with new Date we convert it to date object
           const expirationDate=new Date(new Date().getTime()+ expiresIn * 1000);
           const user=new User(email, userId, token, expirationDate);
         
           //to emit this as our currently logged in user we use subject next 
           this.user.next(user);
    }

    private handleError(errorRes:HttpErrorResponse){
        console.log(errorRes);
        let errorMessage="An unknown error ocurred!";
            if(!errorRes.error || !errorRes.error.error) //if error response doesn't have error key or if it doesn't have error key on the error key
                   return throwError(() => new Error(errorMessage));      //we can't access the message because the error we''re getting seems to be in a different format
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage="Email already exists";
                    break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage="Email not found";
                  break;
                  case 'INVALID_PASSWORD':
                    errorMessage="The password is invalid";
                    break;
                    case 'USER_DISABLED':
                      errorMessage="The user account has been disabled";   
                      break;
              }

              return throwError(() => new Error(errorMessage));
        
    }

}