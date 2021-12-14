import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

 // ingredients:Ingredient[];
  //name:string="";

  
  constructor(private shoppingListService:ShoppingListService) { 
    
  }

  ngOnInit(): void {
  }


  onAddClick(name:string, amount:number)
  {
    //this.newItemEvent.emit({name,amount}); 
    
    //this.newItemEvent.emit(new Ingredient(name, amount));
    // console.log(name, amount);

    this.shoppingListService.addIngredients(new Ingredient(name,amount));

    //this.shoppingListService.ingredientNew.emit(new Ingredient(name,amount));
  }

}
