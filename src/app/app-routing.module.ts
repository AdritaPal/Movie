import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { CreditsComponent } from './credits/credits.component';
import {AppComponent} from './app.component'
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  { path: 'home', component:  HomeComponent},
  { path: 'movie-details/:movie-id', component: DetailsComponent },
  { path: 'credits/:movie-id', component: CreditsComponent },
  { path: 'search/:query', component: SearchComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
