import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'register', component:RegisterComponent}, 
  { path:'recipes', loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
