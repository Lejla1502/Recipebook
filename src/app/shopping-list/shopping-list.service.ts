import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService{
    ingredientsChanged=new EventEmitter<Ingredient[]>();

    ingredients:Ingredient[]=[
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
      ];

    
      getIngredients(){
        return this.ingredients.slice(); //we do slice so we can return copy of an array, not the actual reference
    }

    addIngredients(ingredient:Ingredient)
    {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}