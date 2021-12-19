import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeName = '';
  id:number;
  isIdNan=false;
  changesSaved=false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router:Router) { }
 

  ngOnInit() {
    /*this.route.queryParams.subscribe(
        (queryParams:Params)=>{
          this.id=+queryParams['id'];
          console.log(this.id);
        }
    );*/
    this.id=+this.route.snapshot.params['id'];
   console.log(this.id);
    if(isNaN(this.id) || this.id.toString()==='undefined')
    {
      this.isIdNan=true;
      
    }
    else
    {
      this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
      this.recipeName = this.recipe.name;
    }
      
  }

}
