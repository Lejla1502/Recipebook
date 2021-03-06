
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";


export class RecipeService{
    //recipeSelected=new Subject<Recipe>(); //new EventEmitter<Recipe>();

    recipesChanged=new Subject<Recipe[]>();
    clickedOnDelete=new Subject<number>();


    
    // private recipes:Recipe[]=[
    //     new Recipe("Tasty Schnitzel", "this is simply a test",
    //     "https://upload.wikimedia.org/wikipedia/commons/5/57/990402-ians-recipe-01-IMG_4724.jpg", 
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries', 20)
    //     ]),
    //     new Recipe("Big Fat Burger", "this is simply a test 2",
    //     "https://get.pxhere.com/photo/food-dish-cuisine-ingredient-produce-recipe-staple-food-side-dish-stuffing-vegetable-meat-pilaf-Southwestern-united-states-food-jambalaya-Pebre-salad-1613433.jpg",
    //     [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //     ]),
    //     new Recipe("Pasta Italiana", "this is simply a test 2",
    //     "https://get.pxhere.com/photo/food-dish-cuisine-ingredient-produce-recipe-staple-food-side-dish-stuffing-vegetable-meat-pilaf-Southwestern-united-states-food-jambalaya-Pebre-salad-1613433.jpg",
    //     [
    //         new Ingredient('Pasta', 2),
    //         new Ingredient('Sos', 1)
    //     ]),
    //     new Recipe("Pizza", "this is simply a test 2",
    //     "https://get.pxhere.com/photo/food-dish-cuisine-ingredient-produce-recipe-staple-food-side-dish-stuffing-vegetable-meat-pilaf-Southwestern-united-states-food-jambalaya-Pebre-salad-1613433.jpg",
    //     [
    //         new Ingredient('Dough', 1),
    //         new Ingredient('Salamy', 1)
    //     ])
    //   ];

    private recipes:Recipe[]=[];

      constructor(){}

      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice(); //we do slice so we can return copy of an array, not the actual reference
      }

      getRecipe(index: number) {
    
        const recipe = this.recipes[index];
     
        return recipe;
      }

      addRecipe(recipe:Recipe)
      {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }

      deleteRecipe(index:number)
      {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());


      }
}