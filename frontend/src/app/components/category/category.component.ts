import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
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
  mod = 'category';
  code = '';
  category: Category = new Category('', '', '', 0);

  constructor(private route: ActivatedRoute, private movieService: MovieService, private categoryService: CategoryService, private userService: UserService, private storageService: StorageService,private router: Router) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get('code') as string;
      this.movieService.getByCategory(this.code).subscribe((movies) => {
        this.movies = movies;
      });
      this.categoryService.getByCode(this.code).subscribe((category) => {
        this.pageTitle = this.pageTitle.replace('XXX', category.label);
      });
    });

    this.categoryService.getByCode(this.code).subscribe(data => {
      console.log(data)
      this.category = data;
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

  delete() {
    this.categoryService.delete(this.category.code).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }
}
