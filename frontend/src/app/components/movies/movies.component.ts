import { UserService } from './../../services/user.service';
import { MovieService } from './../../services/movie.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  pageTitle: string = 'Tous les films';
  movies: Movie[] = [];
  currentUser!: User | null;
  mod = 'movies';
  category: Category = new Category('', '', '', 0);

  constructor(private movieService: MovieService, private userService: UserService, private storageService: StorageService) {
    this.movieService.getAll().subscribe((movies) => {
      this.movies = movies;
    });
    this.currentUser = this.storageService.getUser();
    this.storageService.changeEmitted$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  include(movies: Movie[], movie: Movie) {
    return movies.some((m) => m.id === movie.id);
  }

  addToFavorites(movie: Movie) {
    console.log('addToFavorites');
    if (this.currentUser) {
      this.userService.addToFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }

  removeFromFavorites(movie: Movie) {
    console.log('removeFromFavorites');
    if (this.currentUser) {
      this.userService.removeFromFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }

  delete() {
    //console.log('delete');
    //this.movieService.delete(movieId).subscribe(() => {
    //});
  }
}
