import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";


export class RecipeService{
    recipeSelected=new EventEmitter<Recipe>();

    private recipes:Recipe[]=[
        new Recipe("Tasty Schnitzel", "this is simply a test",
        "https://upload.wikimedia.org/wikipedia/commons/5/57/990402-ians-recipe-01-IMG_4724.jpg", 
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe("Big Fat Burger", "this is simply a test 2",
        "https://get.pxhere.com/photo/food-dish-cuisine-ingredient-produce-recipe-staple-food-side-dish-stuffing-vegetable-meat-pilaf-Southwestern-united-states-food-jambalaya-Pebre-salad-1613433.jpg",
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    
      ];

      getRecipes(){
          return this.recipes.slice(); //we do slice so we can return copy of an array, not the actual reference
      }

}