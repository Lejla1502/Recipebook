import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        //with map we get an observable that returns true or redirects to an url 
        //and that allows us to use activate guard in front of the routes
        // that we want to protect

        //to prevent ongoing user subscription, we only take the last user value and then unsubscribe, we use take(1)
        return this.authService.user.pipe(take(1), 
        map(user=>{
            const isAuth= !!user;
            if(isAuth)
                return true;
            
                return this.router.createUrlTree(['/auth']);
        }))
    }
    
} 