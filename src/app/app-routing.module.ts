import { ElectronicsComponent } from './../Components/electronics/electronics.component';
import { JeweleryComponent } from './../Components/jewelery/jewelery.component';
import { ClothesComponent } from './../Components/clothes/clothes.component';
import { HomeComponent } from '../Components/home/home.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { CartComponent } from '../Components/cart/cart.component';
import { AddcomponentComponent } from '../Components/addcomponent/addcomponent.component';


const routes: Routes = [

  {path: '', redirectTo:'Home', pathMatch: 'full'},
  {path: 'app', component:AppComponent},
  {path: 'Home', component:AddcomponentComponent},
  {path: 'Clothes', component:ClothesComponent},
  {path: 'Jewelery', component:JeweleryComponent},
  {path: 'Electronics', component:ElectronicsComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'Cart', component:CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
