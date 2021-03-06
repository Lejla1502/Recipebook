import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth/auth-interceptor.service";
import { AuthService } from "./auth/auth/auth.service";
import { RecipeResolver } from "./recipes/recipe-resolver.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { UserService } from "./user.service";

@NgModule({
    providers: [
        ShoppingListService, 
        RecipeResolver, 
        RecipeService, 
        UserService, 
        AuthService, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi:true 
    }
]
})

export class CoreModule{

}