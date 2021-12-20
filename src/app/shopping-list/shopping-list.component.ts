import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  
  ingredients:Ingredient[];

  igChangesub:Subscription;

  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppinglistService.getIngredients();
    this.igChangesub=this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
          this.ingredients=ingredients;
          console.log(ingredients);
      }
    );
  }

  ngOnDestroy(): void {
      this.igChangesub.unsubscribe();
  }
  
}
