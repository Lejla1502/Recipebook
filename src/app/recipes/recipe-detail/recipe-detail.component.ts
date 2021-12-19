import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;

   id:number;

  constructor(private recipeService:RecipeService, private slService:ShoppingListService, private route:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(   //different way to initialize id
      (params:Params)=>{
       // this.id=+params['id'];
      
        this.recipe=this.recipeService.getRecipe(+params['id']);
      }
        );

      /*  this.route.data.subscribe(
          (data:Data)=>{
            this.recipe=data['recipe'];
          }
        )*/
  }

  addToShoppingList(){
    for(let i=0; i<this.recipe.ingredients.length;i++)
      this.slService.addIngredientsByAmount(this.recipe.ingredients[i]);
  }
}
