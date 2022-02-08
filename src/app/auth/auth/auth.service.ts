import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    


    signUp(email:string, password:string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHXLqFoZLCzy04Ywy58_zJKK4h7UNxvAM',
        {
            email:email,
             password:password, 
             returnSecureToken:true});
    }

}