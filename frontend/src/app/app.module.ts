import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ActorsComponent } from './components/actors/actors.component';
import { FooterComponent } from './components/footer/footer.component';

import { httpInterceptorProviders } from './helpers/http.interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MovieComponent } from './components/movie/movie.component';
import { UsersComponent } from './components/users/users.component';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ActorsComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    MoviesComponent,
    CategoriesComponent,
    MovieComponent,
    UsersComponent,
    UserMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
