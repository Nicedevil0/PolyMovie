import { MovieService } from './../../services/movie.service';
import { User } from './../../models/user.model';
import { Movie } from './../../models/movie.model';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.scss']
})
export class UserMoviesComponent {
  pageTitle: string = 'Mes films favoris';
  currentUser!: User | null;
  constructor(private userService: UserService, private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.storageService.changeEmitted$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  removeFromFavorites(movie: Movie) {
    console.log('removeFromFavorites');
    if (this.currentUser) {
      this.userService.removeFromFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }
}
