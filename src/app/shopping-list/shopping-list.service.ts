import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>(); //new EventEmitter<Ingredient[]>();

    ingredients:Ingredient[]=[
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
      ];

    
      getIngredients(){
        return this.ingredients.slice(); //we do slice so we can return copy of an array, not the actual reference
    }

    addIngredient(ingredient:Ingredient)
    {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsByAmount(ingredient:Ingredient)
    {
        //console.log(ingredient.amount);
        let isfound=false;
        for(let i=0; i<this.ingredients.length;i++)
        {
            if(this.ingredients[i].name==ingredient.name)
                {
                    this.ingredients[i].amount+=ingredient.amount;
                    //console.log(this.ingredients[i].amount);
                    isfound=true;
                    
                }
           
        }

        if(!isfound)
            this.ingredients.push(ingredient);
        
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}