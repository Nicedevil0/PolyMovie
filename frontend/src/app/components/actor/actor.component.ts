import { UserService } from 'src/app/services/user.service';
import { ActorService } from './../../services/actor.service';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { MovieService } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent {
  actor!: Actor | null;
  movies: Movie[] = [];
  currentUser!: User | null;
  constructor(private route: ActivatedRoute, private actorService: ActorService, private movieService: MovieService, private userService: UserService, private storageService: StorageService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.actorService.getById(params.get('id') as unknown as number).subscribe((actor) => {
        this.actor = actor;
      });
      this.movieService.getByActor(params.get('id') as unknown as number).subscribe((movies) => {
        this.movies = movies;
      });
      this.currentUser = this.storageService.getUser();
      this.storageService.changeEmitted$.subscribe((user) => {
        this.currentUser = user;
      });
    });
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
