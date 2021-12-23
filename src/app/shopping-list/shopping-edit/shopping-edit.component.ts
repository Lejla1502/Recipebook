import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

 // ingredients:Ingredient[];
  //name:string="";

  igEditSub:Subscription;
  editMode=false;
  editedItemIndex:number;
  editingIngredient:Ingredient;

  name:any;
  amount:number;

  @ViewChild('f',{static:false}) slForm:NgForm;

  constructor(private shoppingListService:ShoppingListService) { 
    
  }

  ngOnInit(): void {
    this.igEditSub=this.shoppingListService.startedEditing.subscribe((
      index:number)=>
      {
        this.editedItemIndex=index;
        this.editMode=true;
        this.editingIngredient=this.shoppingListService.getIngredient(this.editedItemIndex);
        console.log(this.editingIngredient);
        this.slForm.setValue({
          'name':this.editingIngredient.name,
          'amount':this.editingIngredient.amount
        })
      }
    );

  }

  ngAfterViewInit(){
  
  }


  //we need to use any
  onSubmit(form:NgForm)
  {
    
    //console.log(parseInt(amount)+5);
    //this.newItemEvent.emit({name,amount}); 
    
    //this.newItemEvent.emit(new Ingredient(name, amount));
    // console.log(name, amount);

    const value=form.value;
   
    if(this.editMode)
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value.name,value.amount));
    else
      this.shoppingListService.addIngredientsByAmount(new Ingredient(value.name,value.amount));


    this.editMode=false;
    this.slForm.reset();

    //console.log(amount+5);
    //this.shoppingListService.ingredientNew.emit(new Ingredient(name,amount));
  }

 
  clearForm(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
 
    this.clearForm();
  }

  ngOnDestroy(): void {
      this.igEditSub.unsubscribe();
  }

}
