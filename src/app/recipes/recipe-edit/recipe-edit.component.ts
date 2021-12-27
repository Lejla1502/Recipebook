import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
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
    

    this.route.params.subscribe(
      (params:Params)=>{
    this.id=+params['id'];
    this.editMode=params['id']!=null;
    this.initForm();   //--------------->>>>> we need to call this every time route parameters change, 
                      //                      because that indicates that we reloaded page
  });
  

    //this.initForm();

  }

  private initForm(){
    
    let recipeName='';
    let imagePath='';
    let description='';
    let ingredients=new FormArray([]);


    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);

      recipeName=recipe.name;
      imagePath=recipe.imagePath;
      description=recipe.description;
      
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients)
        {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm=new FormGroup({
      
      'name':new FormControl(recipeName, Validators.required),
      'description':new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required ),
      'ingredients': ingredients
    });
  }

  getControlsOfIngredients(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
   
  onCancelForm()
  {
    //this.router.navigate(['/recipes', this.id]);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit()
  {
    if(this.editMode)
     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else
      this.recipeService.addRecipe(this.recipeForm.value);

     this.editMode=false;
    this.recipeForm.reset();

    //this.router.navigate(['/recipes', this.id]);
    this.onCancelForm();
  }

  onDeleteIngredient(index:number)
  {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
