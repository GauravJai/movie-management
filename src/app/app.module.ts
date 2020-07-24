import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieComponent } from './movie/movie.component';
import { MultiplexComponent } from './multiplex/multiplex.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieFormComponent } from './movie/movie-form/movie-form.component';
import { MultiplexFormComponent } from './multiplex/multiplex-form/multiplex-form.component';
import { MultiplexListComponent } from './multiplex/multiplex-list/multiplex-list.component';
import { RegisterComponent } from './register/register.component';
import { M2mComponent } from './m2m/m2m.component';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { AlertComponent } from './directives/alert.component';
import { HomeComponent } from './home/home.component';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieComponent,
    MultiplexComponent,
    LoginComponent,
    SearchComponent,
    MovieListComponent,
    MovieFormComponent,
    MultiplexFormComponent,
    MultiplexListComponent,
    RegisterComponent,
    M2mComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [ 
    {
      provide : HTTP_INTERCEPTORS, 
      useClass:HttpInterceptorService, 
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
