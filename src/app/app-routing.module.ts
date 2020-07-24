import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MultiplexComponent } from './multiplex/multiplex.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './service/auth-guard.service';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { M2mComponent } from './m2m/m2m.component';
import { Role } from './model/role';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "search", component: SearchComponent},
  { path: "movie", component: MovieComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: "multiplex", component: MultiplexComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  {path: "m2m", component: M2mComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
  /* {path: "search",component: SearchComponent}, */
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  //{ path: '', redirectTo: '/login', pathMatch: 'full'}
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
