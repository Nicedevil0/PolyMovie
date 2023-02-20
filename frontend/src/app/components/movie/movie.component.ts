import { Character } from './../../models/character.model';
import { Movie } from './../../models/movie.model';
import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  movie!: Movie | null;
  characters: Character[] = []
  currentUser!: User | null;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private storageService: StorageService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieService.getById(params.get('id') as unknown as number).subscribe((movie: Movie) => {
        this.movie = movie;
      });
      this.updateCharacters(params.get('id') as unknown as number);
    });
    this.currentUser = this.storageService.getUser();
    this.storageService.changeEmitted$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  updateCharacters(id: number) {
    this.movieService.getCharactersOfMovie(id).subscribe((data: Character[]) => {
      this.characters = data;
    });
  }


  prev() {
    this.movieService.getPrevMovie(this.movie?.id as number).subscribe((movie: Movie) => {
      this.movie = movie;
      this.updateCharacters(this.movie?.id as number);
    });
  }

  next() {
    this.movieService.getNextMovie(this.movie?.id as number).subscribe((movie: Movie) => {
      this.movie = movie;
      this.updateCharacters(this.movie?.id as number);
    });
  }
}
