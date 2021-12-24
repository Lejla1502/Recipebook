import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes:Recipe[];
  recipeChangesub:Subscription;

  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute) { }
  

  ngOnInit(): void {
    
    this.recipeChangesub=this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
          this.recipes=recipes;
          console.log(recipes);
      }
    );

    this.recipes=this.recipeService.getRecipes();
  }

  addRecipe()
  {
    this.router.navigate(['new-recipe'], {relativeTo: this.route});

  }

 ngOnDestroy(): void {
    this.recipeChangesub.unsubscribe();
  }

}
