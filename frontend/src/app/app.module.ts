import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ActorsComponent } from './components/actors/actors.component';
import { FooterComponent } from './components/footer/footer.component';

import { httpInterceptorProviders } from './helpers/http.interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MovieComponent } from './components/movie/movie.component';
import { UsersComponent } from './components/users/users.component';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CategoryComponent } from './components/category/category.component';
import { ActorComponent } from './components/actor/actor.component';
import { FormActorComponent } from './components/form-actor/form-actor.component';
import { FormMovieComponent } from './components/form-movie/form-movie.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation.dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ServerErrorInterceptor } from './helpers/server-error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
registerLocaleData(localeFr);

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
    UserMoviesComponent,
    CategoryComponent,
    ActorComponent,
    FormActorComponent,
    FormMovieComponent,
    FormCategoryComponent,
    ConfirmationDialog,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    httpInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
