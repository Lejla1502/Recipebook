import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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


  //we need to use any
  onAddClick(form:NgForm)
  {
    
    //console.log(parseInt(amount)+5);
    //this.newItemEvent.emit({name,amount}); 
    
    //this.newItemEvent.emit(new Ingredient(name, amount));
    // console.log(name, amount);

    const value=form.value;
   
    this.shoppingListService.addIngredientsByAmount(new Ingredient(value.name,value.amount));
    //console.log(amount+5);
    //this.shoppingListService.ingredientNew.emit(new Ingredient(name,amount));
  }

  onSubmit(){

  }

}
