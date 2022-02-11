import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    

    constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
        const recipes=this.recipeService.getRecipes();
        //put request works in such a way that any 
        this.http.put('https://ng-course-recipe-book-8865c-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(responseData=>{
            console.log(responseData);
        });
    }

    fetchRecipes()
    {
        //taking one value from the observable and automatically unsubscribing - take(1)
        //plus we need to pipe user obervable and http observable together into one big observable
        //we do this with exhaustMap: it waits for the user observable to complete which will happen after we took the latest user
        //after we get the user, we pass it in a function and then we return a new observable which will replace our previous observable in the 
        //entire observable chain
        //in the end the entire observable chain switches to http observable which returns recipes

        return this.authService.user.pipe(take(1), exhaustMap(user=>{
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-8865c-default-rtdb.firebaseio.com/recipes.json',
            {
                params: new HttpParams().set('auth', user.token)
            });

        }),
        map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingredients:recipe.ingredients?recipe.ingredients:[]};
            });
        }), 
        tap(recipes=>{
                this.recipeService.setRecipes(recipes);
        })
        );

        
    }
} 