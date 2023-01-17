import { MovieService } from './../../services/movie.service';
import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movies: Movie[] = [];
  constructor(private movieService: MovieService) {
    this.movieService.getAll().subscribe((movies) => {
      this.movies = movies;
    });
  }
}
