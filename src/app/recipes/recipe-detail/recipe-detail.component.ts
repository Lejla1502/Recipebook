import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

   recipeDeleteSub:Subscription;

  constructor(private recipeService:RecipeService, private slService:ShoppingListService, private route:ActivatedRoute,
    private router:Router) { }

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


     /*   this.recipeDeleteSub=this.recipeService.clickedOnDelete.subscribe((
          index:number)=>
          {
            this.id=index-1;
            this.recipe=this.recipeService.getRecipe(this.id);
            console.log(this.recipe);
          
          }
        );*/
  }

  addToShoppingList(){
    for(let i=0; i<this.recipe.ingredients.length;i++)
      this.slService.addIngredientsByAmount(this.recipe.ingredients[i]);
  }

  onEdit(){
      this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling:'preserve'});
    }
  
    onDelete()
    {
      //
      console.log(this.id);
      this.recipeService.deleteRecipe(this.id);
     
      //this.router.navigate(['/recipes', idNew]);
    }

}
