import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  //isIdNan=false;

  editMode=true;
  changesSaved=false;

  recipeForm:FormGroup;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router:Router) { }
 

  ngOnInit() {
    /*this.route.queryParams.subscribe(
        (queryParams:Params)=>{
          this.id=+queryParams['id'];
          console.log(this.id);
        }
    );*/

    this.route.params.subscribe(
      (params:Params)=>{
    this.id=+params['id'];
    this.editMode=params['id']!=null;
  });
  
    if(this.editMode)
    {
       this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
       this.recipeName = this.recipe.name;
    }

    this.recipeForm=new FormGroup({
      
      'name':new FormControl(null, [Validators.required]),
      'description':new FormControl(null, [Validators.required])
  

    });

  }

  onSubmit()
  {

  }

}
