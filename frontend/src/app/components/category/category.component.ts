import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category',
  templateUrl: '../movies/movies.component.html',
  styleUrls: ['../movies/movies.component.scss']
})
export class CategoryComponent {
  pageTitle: string = 'Genre XXX';
  currentUser: User | null = null;
  movies: Movie[] = [];
  constructor(private route: ActivatedRoute, private movieService: MovieService, private categoryService: CategoryService, private userService: UserService, private storageService: StorageService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieService.getByCategory(params.get('code') as string).subscribe((movies) => {
        this.movies = movies;
      });
      this.categoryService.getByCode(params.get('code') as string).subscribe((category) => {
        this.pageTitle = this.pageTitle.replace('XXX', category.label);
      });
    });
  }

  include(movies: Movie[], movie: Movie) {
    return movies.some((m) => m.id === movie.id);
  }

  addToFavorites(movie: Movie) {
    if (this.currentUser) {
      this.userService.addToFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }

  removeFromFavorites(movie: Movie) {
    if (this.currentUser) {
      this.userService.removeFromFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }
}
