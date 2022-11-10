import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminShoeComponent } from './admin-shoe/admin-shoe.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilComponent } from './profil/profil.component';
import { RatingComponent } from './rating/rating.component';
import { ShoePageComponent } from './shoe-page/shoe-page.component';
import { ShoesPageComponent } from './shoes-page/shoes-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"home",component:HomePageComponent},
  {path:"shoe",component:ShoePageComponent},
  {path:"profil",component:ProfilComponent},
  {path:"shoes",component:ShoesPageComponent},
  {path:"rating",component:RatingComponent},
  {path:"admin",component:AdminShoeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"dashboard", component:AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
