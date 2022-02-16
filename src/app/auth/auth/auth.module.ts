import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CoreModule } from "src/app/core.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule( {
    declarations: [
        AuthComponent
    ],
    imports: [
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path:'', component: AuthComponent}

         ])
    ]
})

export class AuthModule{
    
}