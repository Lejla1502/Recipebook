import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

 // ingredients:Ingredient[];
  //name:string="";

 @Output() newItemEvent = new EventEmitter<{name:string, amount:number}>();
  
  constructor() { 
    
  }

  ngOnInit(): void {
  }


  onAddClick(name:string, amount:number)
  {
    //this.newItemEvent.emit({name,amount}); 
    this.newItemEvent.emit(new Ingredient(name, amount));
     console.log(name, amount);
  }

}
