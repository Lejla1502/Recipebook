import { Recipe } from "./recipe.model";


export class RecipeService{
    private recipes:Recipe[]=[
        new Recipe("a test recipe", "this is simply a test","https://upload.wikimedia.org/wikipedia/commons/5/57/990402-ians-recipe-01-IMG_4724.jpg"),
        new Recipe("a test recipe 2", "this is simply a test 2","https://get.pxhere.com/photo/food-dish-cuisine-ingredient-produce-recipe-staple-food-side-dish-stuffing-vegetable-meat-pilaf-Southwestern-united-states-food-jambalaya-Pebre-salad-1613433.jpg")
    
      ];

      getRecipes(){
          return this.recipes.slice(); //we do slice so we can return copy of an array, not the actual reference
      }
}