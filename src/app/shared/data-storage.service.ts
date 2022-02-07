import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http:HttpClient, private recipeService:RecipeService){
        
    }

    storeRecipes(){
        const recipes=this.recipeService.getRecipes();
        //put request works in such a way that any 
        this.http.put('https://ng-course-recipe-book-8865c-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(responseData=>{
            console.log(responseData);
        });
    }

    fetchRecipes()
    {
        this.http.get<Recipe[]>('https://ng-course-recipe-book-8865c-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes=>{
            this.recipeService.setRecipes(recipes);
        });
    }
}