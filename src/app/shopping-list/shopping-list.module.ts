import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule, CommonModule, ReactiveFormsModule, FormsModule,  
        [RouterModule.forChild(  [{ path: 'shopping-list', component: ShoppingListComponent }]  )],
    ]
    
})

export class ShoppingListModule{

}

