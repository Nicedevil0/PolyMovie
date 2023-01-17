import { UserMoviesComponent } from './components/user-movies/user-movies.component';
import { HomeComponent } from './components/home/home.component';
import { ActorsComponent } from './components/actors/actors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthGuard } from './helpers/auth.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { MovieComponent } from './components/movie/movie.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { roles: [] }},
  { path: 'actors', component: ActorsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'user/movies', component: MoviesComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UserMoviesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
