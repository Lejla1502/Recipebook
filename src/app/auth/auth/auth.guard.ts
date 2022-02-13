import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { isAbsolute } from "path";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        //with map we get an observable that returns true or redirects to an url 
        //and that allows us to use activate guard in front of the routs
        // that we want to protect

        return this.authService.user.pipe(take(1),
        map(user=>{
            const isAuth= !!user;
            if(isAuth)
                return true;
            
                return this.router.createUrlTree(['/auth']);
        }))
    }
    
}